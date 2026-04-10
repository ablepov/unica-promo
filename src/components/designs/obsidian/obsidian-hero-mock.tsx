"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from "react";
import { createPortal } from "react-dom";

import {
  OBSIDIAN_HERO_ARTBOARD,
  type ObsidianHeroMockChatMessage,
  getObsidianHeroMockScene,
  type ObsidianHeroMockHistoryItem,
  type ObsidianHeroMockIcon,
  type ObsidianHeroMockLine,
  type ObsidianHeroMockNavItem,
  type ObsidianHeroMockScene,
} from "./obsidian-hero-mock.scene";

const SIDEBAR_LOGO_SRC = "/designs/obsidian/logo.svg";
const SIDEBAR_AVATAR_SRC = "/designs/obsidian/avatar.png";

const HOST_STYLE = {
  display: "block",
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  background: "#0d0f14",
  "--mock-font-sans": 'var(--font-obsidian-sans), "Inter", system-ui, sans-serif',
  "--mock-font-display": 'var(--font-obsidian-display), "Georgia", serif',
} as CSSProperties;

const SHADOW_STYLES = `
  :host {
    all: initial;
    display: block;
    inline-size: 100%;
    block-size: 100%;
    contain: layout paint style;
    color-scheme: dark;
    font-family: var(--mock-font-sans, system-ui, sans-serif);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .root {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
    background:
      radial-gradient(circle at 24% 18%, rgba(57, 119, 255, 0.11), transparent 20%),
      radial-gradient(circle at 74% 16%, rgba(53, 108, 235, 0.1), transparent 18%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0)),
      #0b0d11;
    color: #f7fbff;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  .root::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.014) 1px, transparent 1px);
    background-size: 52px 52px;
    opacity: 0.28;
    mask-image: linear-gradient(180deg, transparent, black 16%, black 84%, transparent);
    pointer-events: none;
  }

  .root::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(4, 5, 8, 0.18), rgba(4, 5, 8, 0)),
      radial-gradient(circle at 50% 32%, transparent 42%, rgba(0, 0, 0, 0.34) 100%);
    pointer-events: none;
  }

  .artboard {
    position: absolute;
    top: 0;
    left: 0;
    width: 1912px;
    height: 760px;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0)),
      linear-gradient(180deg, #11141a 0%, #0d1014 54%, #0a0c10 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      inset 0 -1px 0 rgba(255, 255, 255, 0.02),
      0 40px 120px rgba(0, 0, 0, 0.45);
    transform-origin: top left;
  }

  .frame {
    display: grid;
    grid-template-columns: 274px minmax(0, 1fr) 1px 638px;
    grid-template-rows: minmax(0, 1fr);
    height: 100%;
  }

  .sidebar {
    position: relative;
    display: flex;
    min-height: 0;
    flex-direction: column;
    overflow: hidden;
    padding: 14px 0 24px;
    background: linear-gradient(180deg, #12161d 0%, #11151c 52%, #0f1319 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.055);
    box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.02);
  }

  .sidebarHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 16px 15px 12px 16px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .brandMark {
    flex: none;
    width: 31px;
    height: 31px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .brandMarkImage {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.24));
  }

  .brandText {
    display: grid;
    gap: 1px;
    min-width: 0;
    max-width: 148px;
  }

  .brandName {
    color: #f5f8ff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.14;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .brandPlan {
    color: rgba(245, 248, 255, 0.94);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.08;
  }

  .workspaceChevron {
    width: 16px;
    height: 16px;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(151, 159, 174, 0.8);
  }

  .sidebarBody {
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    padding: 6px 8px 4px 10px;
  }

  .navGroup {
    display: grid;
    gap: 2px;
  }

  .navItem,
  .historyItem {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 35px;
    padding: 6px 8px;
    border-radius: 9px;
    color: rgba(243, 247, 252, 0.96);
    font-size: 13px;
    line-height: 1.25;
  }

  .navItem {
    font-weight: 600;
  }

  .navItemIcon,
  .historyItemIcon {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(209, 216, 230, 0.86);
    flex: none;
  }

  .navItemLabel,
  .historyItemLabel {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .navItemCount,
  .historyCount {
    margin-left: auto;
    min-width: 16px;
    text-align: right;
    color: rgba(164, 172, 185, 0.92);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  .historySection {
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    overflow: hidden;
    margin-top: 18px;
  }

  .historyHeading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 0 6px 10px 8px;
    color: rgba(163, 174, 192, 0.74);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .historyList {
    display: grid;
    gap: 1px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    align-content: start;
    padding-right: 4px;
  }

  .historyItem {
    color: rgba(229, 234, 241, 0.92);
  }

  .historyItemActive {
    color: #fafcff;
    font-weight: 700;
  }

  .historyItemActive .historyCount {
    color: rgba(194, 201, 212, 0.94);
  }

  .historyItemIndented {
    padding-left: 18px;
  }

  .historyItemMuted {
    color: rgba(218, 225, 236, 0.9);
  }

  .sidebarFooter {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    padding: 10px 8px 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.055);
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      0 1px 8px rgba(0, 0, 0, 0.2);
  }

  .avatarImage {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .footerText {
    display: grid;
    gap: 0;
    min-width: 0;
  }

  .footerName {
    color: #fafcff;
    font-size: 13px;
    font-weight: 700;
  }

  .footerEmail {
    color: rgba(244, 248, 255, 0.92);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footerMenu {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    color: rgba(154, 163, 178, 0.76);
  }

  .workspace {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    height: 100%;
    overflow: hidden;
    background:
      radial-gradient(circle at 30% 18%, rgba(44, 83, 172, 0.08), transparent 20%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0)),
      #111318;
  }

  .workspaceHeader {
    display: flex;
    align-items: center;
    height: 76px;
    padding: 13px 24px 0 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.055);
    color: rgba(244, 248, 255, 0.98);
  }

  .workspaceBreadcrumb {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .workspaceSectionLabel {
    display: inline-flex;
    align-items: center;
    flex: none;
    color: rgba(244, 248, 255, 0.98);
    font-size: 17px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .workspacePathChevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 14px;
    height: 14px;
    color: rgba(164, 173, 188, 0.56);
  }

  .workspacePathChevron .icon {
    width: 14px;
    height: 14px;
    transform: translateY(1px);
  }

  .workspaceTitle {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    color: rgba(244, 248, 255, 0.98);
    font-size: 17px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .workspaceCanvas {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 18px;
    height: auto;
    overflow: hidden;
    padding: 20px 24px 26px 32px;
    min-height: 0;
  }

  .workspaceCanvas::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 47% 27%, rgba(255, 255, 255, 0.025), transparent 24%),
      linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.16));
    pointer-events: none;
  }

  .chatViewport {
    position: relative;
    flex: 1;
    min-height: 0;
    width: min(100%, 632px);
    max-width: 632px;
    margin-inline: auto;
    overflow: hidden;
    padding-right: 0;
    z-index: 1;
  }

  .chatRail {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-height: 100%;
    padding: 4px 0 0;
    z-index: 1;
  }

  .chatMessage {
    max-width: min(100%, 696px);
  }

  .chatMessageAssistant {
    align-self: flex-start;
  }

  .chatMessageUser {
    align-self: flex-end;
    max-width: 336px;
  }

  .chatAssistantContent {
    color: #f4f7ff;
    font-size: 15px;
    line-height: 1.68;
    letter-spacing: -0.015em;
  }

  .assistantBlocks {
    display: grid;
    gap: 14px;
  }

  .assistantParagraph {
    margin: 0;
  }

  .chatAssistantGreeting .assistantParagraph {
    font-weight: 650;
  }

  .assistantQuote {
    margin: 0;
    padding: 12px 0 12px 16px;
    border-left: 3px solid rgba(110, 119, 136, 0.58);
    color: rgba(197, 204, 217, 0.94);
    font-style: italic;
  }

  .assistantQuoteLine {
    margin: 0;
  }

  .assistantQuoteLine + .assistantQuoteLine {
    margin-top: 4px;
  }

  .assistantList {
    margin: 0;
    padding-left: 20px;
    color: #f4f7ff;
  }

  .assistantList li + li {
    margin-top: 8px;
  }

  .assistantListOrdered {
    padding-left: 24px;
  }

  .chatAssistantResponse {
    max-width: min(100%, 720px);
  }

  .chatAssistantToolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
    color: rgba(170, 181, 198, 0.8);
  }

  .chatAssistantMeta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 18px;
  }

  .chatAssistantTime {
    margin-left: auto;
    color: #8da2d1;
    font-size: 12px;
    font-weight: 500;
  }

  .chatUserBubble {
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    max-width: 336px;
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(31, 35, 43, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.04);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
  }

  .chatUserText {
    color: #f7fbff;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.45;
    white-space: pre-wrap;
  }

  .documentCard {
    position: relative;
    z-index: 1;
    width: min(100%, 632px);
    max-width: 632px;
    margin-inline: auto;
    padding: 18px 18px 16px;
    border-radius: 18px;
    background: rgba(22, 25, 32, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.26);
  }

  .documentTitleRow {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .documentTitle {
    color: #ffffff;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .documentTitleChevron {
    color: rgba(157, 167, 184, 0.74);
  }

  .documentExcerpt {
    margin: 14px 0 16px;
    color: #f3f7fc;
    font-size: 14px;
    line-height: 1.6;
    letter-spacing: -0.01em;
  }

  .documentActions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 14px;
  }

  .documentPill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: rgba(25, 29, 37, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(250, 252, 255, 0.98);
    font-size: 13px;
    font-weight: 600;
  }

  .documentPillActive {
    border-color: rgba(114, 145, 219, 0.42);
    background: rgba(35, 40, 51, 0.98);
  }

  .documentUtilityRow {
    display: flex;
    gap: 12px;
    margin-top: 10px;
    padding-left: 2px;
    color: rgba(189, 198, 211, 0.74);
  }

  .utilityIcon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  }

  .composer {
    position: relative;
    z-index: 1;
    width: min(100%, 632px);
    max-width: 632px;
    margin-inline: auto;
    margin-top: auto;
    padding: 14px 16px 10px;
    border-radius: 18px;
    background: rgba(30, 33, 41, 0.98);
    border: 2px solid rgba(66, 120, 232, 0.9);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 24px 48px rgba(0, 0, 0, 0.28);
  }

  .composerInput {
    min-height: 24px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
  }

  .composerBottom {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
  }

  .composerTools {
    display: flex;
    align-items: center;
    gap: 14px;
    color: rgba(196, 204, 218, 0.74);
  }

  .composerSend {
    margin-left: auto;
    width: 34px;
    height: 34px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #3d80f6, #2f6fe2);
    color: white;
    box-shadow: 0 10px 24px rgba(52, 100, 198, 0.32);
  }

  .divider {
    position: relative;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.05));
  }

  .inspector {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    height: 100%;
    overflow: hidden;
    background:
      radial-gradient(circle at 30% 18%, rgba(44, 83, 172, 0.08), transparent 20%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0)),
      #111318;
  }

  .inspectorTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex: 0 0 76px;
    height: 76px;
    min-height: 76px;
    box-sizing: border-box;
    padding: 13px 22px 0 36px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.055);
  }

  .inspectorTitle {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    color: #ffffff;
    font-size: 17px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .inspectorActions {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin-left: auto;
    min-height: 36px;
    color: rgba(239, 244, 251, 0.95);
  }

  .actionButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 36px;
    padding: 0 14px;
    border-radius: 999px;
    background: linear-gradient(180deg, #3e86fb, #3479eb);
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
    box-shadow: 0 12px 30px rgba(53, 118, 232, 0.3);
  }

  .topAction {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 36px;
    color: rgba(247, 250, 255, 0.95);
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
  }

  .actionButton .icon,
  .topAction .icon {
    width: 16px;
    height: 16px;
  }

  .inspectorBody {
    flex: 1;
    min-height: 0;
    padding: 20px 36px 0;
  }

  .transcriptBlock {
    color: #f6f9fe;
    font-size: 14px;
    line-height: 1.55;
  }

  .transcriptLine + .transcriptLine {
    margin-top: 4px;
  }

  .highlight {
    color: #ffd4c0;
    text-decoration-line: underline;
    text-decoration-color: #ef7d49;
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;
  }

  .transcriptMeta {
    color: rgba(156, 166, 182, 0.88);
  }

  .hint {
    margin-top: 18px;
    color: rgba(158, 165, 178, 0.9);
    font-size: 13px;
    font-style: italic;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex: none;
  }

  .icon svg {
    width: 100%;
    height: 100%;
    display: block;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @keyframes chatCursorBlink {
    0%, 45% {
      opacity: 1;
    }

    46%, 100% {
      opacity: 0;
    }
  }

  @keyframes chatTypingPulse {
    0%, 80%, 100% {
      opacity: 0.28;
      transform: translateY(0);
    }

    40% {
      opacity: 1;
      transform: translateY(-2px);
    }
  }
`;

type MockLayout = {
  width: number;
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
};

function getMockLayout(width: number, height: number): MockLayout {
  const safeWidth = width || OBSIDIAN_HERO_ARTBOARD.width;
  const safeHeight = height || OBSIDIAN_HERO_ARTBOARD.height;
  const scale = Math.max(
    safeWidth / OBSIDIAN_HERO_ARTBOARD.width,
    safeHeight / OBSIDIAN_HERO_ARTBOARD.height,
  );
  const scaledWidth = OBSIDIAN_HERO_ARTBOARD.width * scale;
  const scaledHeight = OBSIDIAN_HERO_ARTBOARD.height * scale;

  return {
    width: safeWidth,
    height: safeHeight,
    scale,
    offsetX: (safeWidth - scaledWidth) / 2,
    offsetY: (safeHeight - scaledHeight) / 2,
  };
}

type AnimatedChatMessage = {
  id: string;
  role: ObsidianHeroMockChatMessage["role"];
  timestamp: string;
  content: string;
  appearProgress: number;
  isStreaming: boolean;
  isComplete: boolean;
  utilityActions: readonly ObsidianHeroMockIcon[];
};

type ChatAnimationState = {
  messages: readonly AnimatedChatMessage[];
  threadOpacity: number;
  threadOffsetY: number;
  scrollbarTop: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

function getStreamedText(content: string, progress: number) {
  const characters = Array.from(content);
  const visibleCount = Math.ceil(characters.length * clamp01(progress));

  return characters.slice(0, visibleCount).join("");
}

function getChatAnimationState(
  messages: readonly ObsidianHeroMockChatMessage[],
  cycleDurationMs: number,
  fadeOutMs: number,
  elapsedMs: number,
): ChatAnimationState {
  const revealWindowMs = 240;
  const visibleMessages: AnimatedChatMessage[] = [];

  for (const message of messages) {
    if (elapsedMs < message.startMs) {
      continue;
    }

    const appearProgress = easeOutCubic(clamp01((elapsedMs - message.startMs) / revealWindowMs));

    if (message.streamDurationMs) {
      const streamProgress = clamp01((elapsedMs - message.startMs) / message.streamDurationMs);
      visibleMessages.push({
        id: message.id,
        role: message.role,
        timestamp: message.timestamp,
        content: getStreamedText(message.content, streamProgress),
        appearProgress,
        isStreaming: streamProgress > 0 && streamProgress < 1,
        isComplete: streamProgress >= 1,
        utilityActions: message.utilityActions ?? [],
      });
      continue;
    }

    visibleMessages.push({
      id: message.id,
      role: message.role,
      timestamp: message.timestamp,
      content: message.content,
      appearProgress,
      isStreaming: false,
      isComplete: true,
      utilityActions: message.utilityActions ?? [],
    });
  }

  const fadeStartMs = Math.max(0, cycleDurationMs - fadeOutMs);
  const fadeProgress =
    elapsedMs > fadeStartMs ? 1 - clamp01((elapsedMs - fadeStartMs) / Math.max(1, fadeOutMs)) : 1;
  const firstAnimatedStart = messages[1]?.startMs ?? messages[0]?.startMs ?? 0;
  const lastMessage = messages[messages.length - 1];
  const lastAnimatedEnd =
    (lastMessage?.startMs ?? 0) + (lastMessage?.streamDurationMs ?? revealWindowMs) + 420;
  const scrollProgress = clamp01(
    (elapsedMs - firstAnimatedStart) / Math.max(1, lastAnimatedEnd - firstAnimatedStart),
  );

  return {
    messages: visibleMessages,
    threadOpacity: fadeProgress,
    threadOffsetY: -76 * scrollProgress,
    scrollbarTop: 10 + 108 * scrollProgress,
  };
}

function MockIcon({ name }: { name: ObsidianHeroMockIcon }) {
  const svgProps: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "plus":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </span>
      );
    case "sparkles":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3Z" />
            <path d="m5 15.5.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z" />
            <path d="m18.5 14 .8 2.1 2.2.8-2.2.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z" />
          </svg>
        </span>
      );
    case "brain":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M9.5 6.5a2.5 2.5 0 0 1 5 0v1" />
            <path d="M8 8.5a2.5 2.5 0 0 0-3 4v1a2.5 2.5 0 0 0 2.5 2.5h1" />
            <path d="M16 8.5a2.5 2.5 0 0 1 3 4v1a2.5 2.5 0 0 1-2.5 2.5h-1" />
            <path d="M9 10.5v6" />
            <path d="M15 10.5v6" />
            <path d="M9 13h6" />
          </svg>
        </span>
      );
    case "file":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M8 3.5h6l4 4V20a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
            <path d="M14 3.5v4h4" />
            <path d="M10 12h4" />
            <path d="M10 16h4" />
          </svg>
        </span>
      );
    case "chain":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M10 14 8.5 15.5a3 3 0 1 1-4.2-4.2L7 8.6" />
            <path d="m14 10 1.5-1.5a3 3 0 0 1 4.2 4.2L17 15.4" />
            <path d="m9 15 6-6" />
          </svg>
        </span>
      );
    case "wand":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m14.5 4.5 5 5" />
            <path d="M5 19 16 8" />
            <path d="m12 3 .7 1.8L14.5 5.5l-1.8.7L12 8l-.7-1.8-1.8-.7 1.8-.7L12 3Z" />
            <path d="m4 20 1.5-1.5" />
          </svg>
        </span>
      );
    case "sliders":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M6 5v14" />
            <path d="M18 5v14" />
            <path d="M12 5v14" />
            <path d="M4 9h4" />
            <path d="M10 15h4" />
            <path d="M16 11h4" />
          </svg>
        </span>
      );
    case "slidersHorizontal":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M3 4h7" />
            <path d="M14 4h7" />
            <path d="M3 12h5" />
            <path d="M12 12h9" />
            <path d="M3 20h9" />
            <path d="M16 20h5" />
            <path d="M14 2v4" />
            <path d="M8 10v4" />
            <path d="M16 18v4" />
          </svg>
        </span>
      );
    case "bars":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M6 18V9" />
            <path d="M12 18V5" />
            <path d="M18 18v-7" />
          </svg>
        </span>
      );
    case "chevron":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m9 6 6 6-6 6" />
          </svg>
        </span>
      );
    case "chevronDown":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      );
    case "chevronsUpDown":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </span>
      );
    case "audio":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M9 18a3 3 0 1 0 0-6H7v6h2Z" />
            <path d="M15 15V6l4-1.2" />
            <path d="M15 10.5 19 9.3" />
            <path d="M19 16a2.5 2.5 0 1 1-5 0c0-1.4 1.1-2.4 2.5-2.4S19 14.6 19 16Z" />
          </svg>
        </span>
      );
    case "lightning":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z" />
          </svg>
        </span>
      );
    case "download":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M12 4v10" />
            <path d="m8 11 4 4 4-4" />
            <path d="M5 19h14" />
          </svg>
        </span>
      );
    case "close":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m6 6 12 12" />
            <path d="M18 6 6 18" />
          </svg>
        </span>
      );
    case "at":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M16.5 16.5A5.5 5.5 0 1 1 18 12v1.5a2 2 0 0 1-4 0V9.8a3.2 3.2 0 1 0 1.1 2.4" />
          </svg>
        </span>
      );
    case "paperclip":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m9.5 12.5 5.9-5.9a3.2 3.2 0 1 1 4.6 4.5L11 20a5 5 0 0 1-7.1-7.1l8.7-8.7a2.3 2.3 0 0 1 3.3 3.3L8.6 14.8" />
          </svg>
        </span>
      );
    case "send":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="m4 12 15-7-4.5 14-2.6-5.1L4 12Z" />
            <path d="M11.9 13.9 19 5" />
          </svg>
        </span>
      );
    case "copy":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M9 9.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
            <path d="M6.5 14H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v.5" />
          </svg>
        </span>
      );
    case "ellipsis":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M12 5v.01" />
            <path d="M12 12v.01" />
            <path d="M12 19v.01" />
          </svg>
        </span>
      );
    case "unica":
      return (
        <span className="icon">
          <svg {...svgProps}>
            <path d="M12 3v4" />
            <path d="m12 3 1.8 1.8" />
            <path d="M12 3 10.2 4.8" />
            <path d="M12 21v-4" />
            <path d="m12 21 1.8-1.8" />
            <path d="M12 21 10.2 19.2" />
            <path d="M3 12h4" />
            <path d="m3 12 1.8-1.8" />
            <path d="M3 12 4.8 13.8" />
            <path d="M21 12h-4" />
            <path d="m21 12-1.8-1.8" />
            <path d="M21 12 19.2 13.8" />
            <circle cx="12" cy="12" r="1.4" />
          </svg>
        </span>
      );
    default:
      return null;
  }
}

function SidebarNavItem({ item }: { item: ObsidianHeroMockNavItem }) {
  return (
    <div className="navItem">
      <span className="navItemIcon">
        <MockIcon name={item.icon} />
      </span>
      <span className="navItemLabel">{item.label}</span>
      {item.count ? <span className="navItemCount">{item.count}</span> : null}
    </div>
  );
}

function SidebarHistoryItem({ item }: { item: ObsidianHeroMockHistoryItem }) {
  const className = [
    "historyItem",
    item.active ? "historyItemActive" : "historyItemMuted",
    item.indent ? "historyItemIndented" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <span className="historyItemIcon">
        <MockIcon name={item.icon ?? "wand"} />
      </span>
      <span className="historyItemLabel">{item.label}</span>
      {item.count ? <span className="historyCount">{item.count}</span> : null}
    </div>
  );
}

function TranscriptLine({ line }: { line: ObsidianHeroMockLine }) {
  return (
    <p className="transcriptLine">
      {line.segments.map((segment, index) => (
        <span
          key={`${segment.text}-${index}`}
          className={
            segment.metadata ? "transcriptMeta" : segment.highlight ? "highlight" : undefined
          }
        >
          {segment.text}
        </span>
      ))}
    </p>
  );
}

function renderAssistantContent(content: string): ReactNode {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="assistantBlocks">
      {blocks.map((block, index) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        if (lines.every((line) => line.startsWith(">"))) {
          return (
            <blockquote key={`quote-${index}`} className="assistantQuote">
              {lines.map((line, lineIndex) => (
                <p key={`quote-line-${lineIndex}`} className="assistantQuoteLine">
                  {line.replace(/^>\s?/, "")}
                </p>
              ))}
            </blockquote>
          );
        }

        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={`list-ordered-${index}`} className="assistantList assistantListOrdered">
              {lines.map((line, lineIndex) => (
                <li key={`ordered-item-${lineIndex}`}>{line.replace(/^\d+\.\s/, "")}</li>
              ))}
            </ol>
          );
        }

        if (lines.every((line) => /^[-•]\s/.test(line))) {
          return (
            <ul key={`list-${index}`} className="assistantList">
              {lines.map((line, lineIndex) => (
                <li key={`list-item-${lineIndex}`}>{line.replace(/^[-•]\s/, "")}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`paragraph-${index}`} className="assistantParagraph">
            {lines.join(" ")}
          </p>
        );
      })}
    </div>
  );
}

function ShadowMarkup({
  layout,
  scene,
}: {
  layout: MockLayout;
  scene: ObsidianHeroMockScene;
}) {
  const transformStyle = {
    transform: `translate3d(${layout.offsetX}px, ${layout.offsetY}px, 0) scale(${layout.scale})`,
  } as CSSProperties;

  return (
    <>
      <style>{SHADOW_STYLES}</style>
      <div className="root">
        <div className="artboard" style={transformStyle}>
          <div className="frame">
            <aside className="sidebar">
              <div className="sidebarHeader">
                <div className="brand">
                  <div className="brandMark">
                    <img src={SIDEBAR_LOGO_SRC} alt="" className="brandMarkImage" />
                  </div>
                  <div className="brandText">
                    <span className="brandName">{scene.sidebar.workspaceName}</span>
                    <span className="brandPlan">{scene.sidebar.workspacePlan}</span>
                  </div>
                </div>
                <div className="workspaceChevron">
                  <MockIcon name="chevronsUpDown" />
                </div>
              </div>

              <div className="sidebarBody">
                <div className="navGroup">
                  {scene.sidebar.primaryNav.map((item) => (
                    <SidebarNavItem key={item.label} item={item} />
                  ))}
                </div>

                <div className="historySection">
                  <div className="historyHeading">
                    <span>{scene.sidebar.historyTitle}</span>
                    <MockIcon name="slidersHorizontal" />
                  </div>

                  <div className="historyList">
                    {scene.sidebar.historyItems.map((item, index) => (
                      <SidebarHistoryItem key={`${item.label}-${item.count ?? "none"}-${index}`} item={item} />
                    ))}
                  </div>
                </div>

                <div className="sidebarFooter">
                  <div className="avatar">
                    <img src={SIDEBAR_AVATAR_SRC} alt="" className="avatarImage" />
                  </div>
                  <div className="footerText">
                    <span className="footerName">{scene.sidebar.footer.name}</span>
                  </div>
                  <div className="footerMenu">
                    <MockIcon name="ellipsis" />
                  </div>
                </div>
              </div>
            </aside>

            <section className="workspace">
              <div className="workspaceHeader">
                <div className="workspaceBreadcrumb">
                  <span className="workspaceSectionLabel">Стенограмма</span>
                  <span className="workspacePathChevron">
                    <MockIcon name="chevron" />
                  </span>
                  <span className="workspaceTitle">{scene.workspace.title}</span>
                </div>
              </div>

              <div className="workspaceCanvas">
                <div className="documentCard">
                  <div className="documentTitleRow">
                    <span className="documentTitle">{scene.workspace.contextCard.title}</span>
                    <span className="documentTitleChevron">
                      <MockIcon name="chevron" />
                    </span>
                  </div>
                  {scene.workspace.contextCard.excerpt ? (
                    <p className="documentExcerpt">{scene.workspace.contextCard.excerpt}</p>
                  ) : null}
                  <div className="documentActions">
                    {scene.workspace.contextCard.actions.map((action) => (
                      <div
                        key={action.label}
                        className={`documentPill ${action.active ? "documentPillActive" : ""}`}
                      >
                        <MockIcon name="file" />
                        <span>{action.label}</span>
                        {action.active ? <MockIcon name="chevron" /> : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chatViewport">
                  <div className="chatRail">
                    {scene.workspace.chat.messages.map((message) => {
                      if (message.role === "user") {
                        return (
                          <div key={message.id} className="chatMessage chatMessageUser">
                            <div className="chatUserBubble">
                              <span className="chatUserText">{message.content}</span>
                            </div>
                          </div>
                        );
                      }

                      const assistantClassName = [
                        "chatMessage",
                        "chatMessageAssistant",
                        message.id === "greeting" ? "chatAssistantGreeting" : "chatAssistantResponse",
                      ].join(" ");

                      return (
                        <div key={message.id} className={assistantClassName}>
                          <div className="chatAssistantContent">{renderAssistantContent(message.content)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="composer">
                  <div className="composerInput">{scene.workspace.composer.draft}</div>
                  <div className="composerBottom">
                    <div className="composerTools">
                      <MockIcon name="paperclip" />
                      <MockIcon name="at" />
                    </div>

                    <div className="composerSend">
                      <MockIcon name="send" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider">
              <div className="ndle">
                <MockIcon name="bars" />
              </div>
            </div>

            <aside className="inspector">
              <div className="inspectorTop">
                <div className="inspectorTitle">{scene.inspector.title}</div>
                <div className="inspectorActions">
                  <div className="actionButton">
                    <MockIcon name="lightning" />
                    <span>{scene.inspector.actionLabel}</span>
                    <MockIcon name="chevronDown" />
                  </div>
                  {scene.inspector.showDownload ? (
                    <div className="topAction">
                      <MockIcon name="download" />
                      <span>Скачать</span>
                    </div>
                  ) : null}
                  {scene.inspector.showClose ? (
                    <div className="topAction">
                      <MockIcon name="close" />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="inspectorBody">
                <div className="transcriptBlock">
                  {scene.inspector.lines.map((line, index) => (
                    <TranscriptLine key={index} line={line} />
                  ))}
                </div>
                <div className="hint">{scene.inspector.hint}</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export function ObsidianHeroMock() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [hostElement, setHostElement] = useState<HTMLDivElement | null>(null);
  const [hostSize, setHostSize] = useState({ width: 0, height: 0 });
  const shadowRoot = hostElement?.shadowRoot ?? null;

  const handleHostRef = useCallback((node: HTMLDivElement | null) => {
    hostRef.current = node;

    if (!node) {
      setHostElement(null);
      return;
    }

    if (!node.shadowRoot) {
      node.attachShadow({ mode: "open" });
    }

    setHostElement(node);
  }, []);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const updateSize = (width: number, height: number) => {
      setHostSize((current) =>
        current.width === width && current.height === height ? current : { width, height },
      );
    };

    updateSize(host.clientWidth, host.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      updateSize(entry.contentRect.width, entry.contentRect.height);
    });

    resizeObserver.observe(host);

    return () => resizeObserver.disconnect();
  }, []);

  const scene = getObsidianHeroMockScene(hostSize.width);
  const layout = getMockLayout(hostSize.width, hostSize.height);

  return (
    <div ref={handleHostRef} aria-hidden="true" style={HOST_STYLE}>
      {shadowRoot
        ? createPortal(<ShadowMarkup layout={layout} scene={scene} />, shadowRoot)
        : null}
    </div>
  );
}

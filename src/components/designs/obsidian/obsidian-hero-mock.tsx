"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
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
    grid-template-columns: 255px minmax(0, 1fr) 1px 656px;
    height: 100%;
  }

  .sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(11, 13, 17, 0.98), rgba(12, 14, 18, 0.96));
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }

  .sidebarHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 18px 14px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .brandMark {
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(circle at 50% 50%, rgba(160, 255, 46, 0.18), rgba(160, 255, 46, 0)),
      rgba(6, 10, 6, 0.9);
    border: 1px solid rgba(181, 255, 71, 0.28);
    color: #b6ff39;
    box-shadow: 0 0 0 4px rgba(153, 255, 0, 0.04);
  }

  .brandText {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  .brandName {
    color: #f4f8ff;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }

  .brandPlan {
    color: rgba(229, 236, 248, 0.85);
    font-size: 12px;
    font-weight: 500;
  }

  .workspaceChevron {
    color: rgba(166, 175, 194, 0.7);
  }

  .sidebarBody {
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    padding: 6px 10px 14px;
  }

  .navGroup {
    display: grid;
    gap: 4px;
  }

  .navItem,
  .historyItem {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 34px;
    padding: 7px 8px;
    border-radius: 10px;
    color: rgba(243, 247, 252, 0.96);
    font-size: 13px;
    line-height: 1.2;
  }

  .navItemIcon,
  .historyItemIcon {
    color: rgba(209, 216, 230, 0.88);
    flex: none;
  }

  .navItemCount,
  .historyCount {
    margin-left: auto;
    color: #7ba9ff;
    font-size: 12px;
    font-weight: 500;
  }

  .historySection {
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    margin-top: 16px;
  }

  .historyHeading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 0 8px 10px;
    color: rgba(177, 186, 201, 0.72);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .historyList {
    display: grid;
    gap: 2px;
    min-height: 0;
    overflow: hidden;
  }

  .historyItem {
    color: rgba(226, 232, 241, 0.9);
  }

  .historyItemActive {
    background: rgba(255, 255, 255, 0.03);
    color: #f8fbff;
    font-weight: 700;
  }

  .historyItemIndented {
    padding-left: 26px;
  }

  .historyItemMuted {
    color: rgba(194, 202, 214, 0.86);
  }

  .sidebarFooter {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: auto;
    padding: 12px 8px 8px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: linear-gradient(180deg, #f3e0d5, #d6b9a3);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }

  .footerText {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  .footerName {
    color: #fafcff;
    font-size: 12px;
    font-weight: 700;
  }

  .footerEmail {
    color: rgba(241, 245, 252, 0.9);
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footerMenu {
    margin-left: auto;
    color: rgba(161, 170, 184, 0.74);
  }

  .workspace {
    position: relative;
    min-width: 0;
    background:
      radial-gradient(circle at 30% 18%, rgba(44, 83, 172, 0.08), transparent 20%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0)),
      #111318;
  }

  .workspaceHeader {
    display: flex;
    align-items: center;
    gap: 14px;
    height: 62px;
    padding: 0 22px 0 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.055);
    color: rgba(244, 248, 255, 0.98);
  }

  .workspaceTitle {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .workspacePathIcon {
    color: rgba(151, 162, 181, 0.7);
  }

  .workspacePathChevron {
    color: rgba(164, 173, 188, 0.56);
  }

  .workspaceCanvas {
    position: relative;
    height: calc(100% - 62px);
    overflow: hidden;
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

  .floatingAudio {
    position: absolute;
    top: 28px;
    left: 56%;
    transform: translateX(-50%);
    width: 324px;
    padding: 12px 16px;
    border-radius: 16px;
    display: grid;
    gap: 4px;
    background: rgba(31, 35, 44, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  }

  .floatingAudioRow {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .floatingAudioIcon {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(243, 247, 255, 0.92);
    background: rgba(16, 18, 24, 0.84);
    flex: none;
  }

  .floatingAudioText {
    display: grid;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }

  .floatingAudioTitle {
    color: #fbfdff;
    font-size: 15px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .floatingAudioMeta {
    color: rgba(200, 208, 224, 0.84);
    font-size: 13px;
  }

  .floatingAudioDuration {
    justify-self: end;
    color: #8ba4d8;
    font-size: 12px;
    font-weight: 500;
  }

  .chatViewport {
    position: absolute;
    top: 88px;
    left: 48px;
    right: 18px;
    bottom: 108px;
    overflow: hidden;
  }

  .chatRail {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 12px 18px 0 0;
    will-change: transform, opacity;
  }

  .chatMessage {
    max-width: 640px;
    will-change: transform, opacity;
  }

  .chatMessageAssistant {
    align-self: flex-start;
  }

  .chatMessageUser {
    align-self: flex-end;
    max-width: 360px;
  }

  .chatAssistantContent {
    color: #f4f7ff;
    font-size: 15px;
    line-height: 1.66;
    letter-spacing: -0.015em;
    white-space: pre-wrap;
  }

  .chatAssistantGreeting .chatAssistantContent {
    font-size: 15px;
    font-weight: 650;
  }

  .chatAssistantResponse {
    max-width: 620px;
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
    min-width: 228px;
    max-width: 360px;
    padding: 14px 16px 12px;
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

  .chatUserTime {
    align-self: flex-end;
    color: #9fb0d8;
    font-size: 12px;
    font-weight: 500;
  }

  .chatTyping {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-height: 24px;
    padding-top: 2px;
  }

  .chatTypingDot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: rgba(154, 165, 184, 0.88);
    animation: chatTypingPulse 1.2s ease-in-out infinite;
  }

  .chatTypingDot:nth-child(2) {
    animation-delay: 0.18s;
  }

  .chatTypingDot:nth-child(3) {
    animation-delay: 0.36s;
  }

  .chatStreamCursor {
    display: inline-block;
    width: 8px;
    height: 1.1em;
    margin-left: 2px;
    vertical-align: text-bottom;
    border-radius: 2px;
    background: linear-gradient(180deg, rgba(120, 153, 255, 0.95), rgba(95, 132, 247, 0.86));
    animation: chatCursorBlink 0.9s step-end infinite;
  }

  .chatScrollbar {
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 8px;
    width: 3px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  .chatScrollbarThumb {
    position: absolute;
    left: 0;
    width: 100%;
    height: 84px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(137, 163, 255, 0.42), rgba(95, 120, 214, 0.72));
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  .documentCard {
    position: absolute;
    top: 130px;
    left: 48px;
    width: 770px;
    padding: 18px 18px 12px;
    border-radius: 16px;
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
    line-height: 1.62;
    letter-spacing: -0.01em;
  }

  .documentActions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
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
    position: absolute;
    left: 48px;
    right: 48px;
    bottom: 20px;
    max-width: 770px;
    padding: 14px 14px 10px;
    border-radius: 18px;
    background: rgba(27, 31, 39, 0.98);
    border: 1px solid rgba(130, 142, 165, 0.36);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 24px 48px rgba(0, 0, 0, 0.25);
  }

  .composerPlaceholder {
    color: #7e8ca5;
    font-size: 13px;
  }

  .composerBottom {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 18px;
  }

  .composerTools {
    display: flex;
    align-items: center;
    gap: 14px;
    color: rgba(196, 204, 218, 0.8);
  }

  .composerChip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: 32px;
    margin-left: 4px;
    padding: 0 12px;
    border-radius: 999px;
    background: rgba(38, 43, 53, 0.98);
    color: #f8fbff;
    font-size: 13px;
    font-weight: 600;
    max-width: 220px;
  }

  .composerChipText {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .composerSend {
    margin-left: auto;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #376fcf, #315fc0);
    color: white;
    box-shadow: 0 10px 24px rgba(52, 100, 198, 0.32);
  }

  .divider {
    position: relative;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.05));
  }

  .dividerHandle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 30px;
    border-radius: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(43, 46, 54, 0.98);
    color: rgba(192, 201, 214, 0.6);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  }

  .inspector {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: linear-gradient(180deg, rgba(14, 16, 21, 0.98), rgba(11, 13, 18, 0.98));
  }

  .inspectorTop {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 22px;
    min-height: 62px;
  }

  .inspectorTitle {
    min-width: 0;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .inspectorActions {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-left: auto;
    color: rgba(239, 244, 251, 0.95);
  }

  .actionButton {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 36px;
    padding: 0 14px;
    border-radius: 999px;
    background: linear-gradient(180deg, #3e86fb, #3479eb);
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 12px 30px rgba(53, 118, 232, 0.3);
  }

  .topAction {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(247, 250, 255, 0.95);
    font-size: 13px;
    font-weight: 600;
  }

  .tabs {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 36px;
    min-height: 42px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .tabActive {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 42px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
  }

  .tabActive::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: #4387fb;
  }

  .tabAction {
    color: rgba(245, 249, 255, 0.96);
  }

  .inspectorBody {
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
      <span>{item.label}</span>
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
        <MockIcon name="chain" />
      </span>
      <span>{item.label}</span>
      {item.count ? <span className="historyCount">{item.count}</span> : null}
    </div>
  );
}

function TranscriptLine({ line }: { line: ObsidianHeroMockLine }) {
  return (
    <p className="transcriptLine">
      {line.segments.map((segment, index) => (
        <span key={`${segment.text}-${index}`} className={segment.highlight ? "highlight" : undefined}>
          {segment.text}
        </span>
      ))}
    </p>
  );
}

function getMessageTransform(role: AnimatedChatMessage["role"], progress: number) {
  const translateX = role === "user" ? (1 - progress) * 14 : -(1 - progress) * 6;
  const translateY = (1 - progress) * 14;

  return `translate3d(${translateX}px, ${translateY}px, 0)`;
}

function TypingDots() {
  return (
    <span className="chatTyping" aria-hidden="true">
      <span className="chatTypingDot" />
      <span className="chatTypingDot" />
      <span className="chatTypingDot" />
    </span>
  );
}

function ShadowMarkup({
  layout,
  scene,
  elapsedMs,
}: {
  layout: MockLayout;
  scene: ObsidianHeroMockScene;
  elapsedMs: number;
}) {
  const transformStyle = {
    transform: `translate3d(${layout.offsetX}px, ${layout.offsetY}px, 0) scale(${layout.scale})`,
  } as CSSProperties;
  const chatAnimation = getChatAnimationState(
    scene.workspace.chat.messages,
    scene.workspace.chat.cycleDurationMs,
    scene.workspace.chat.fadeOutMs,
    elapsedMs,
  );
  const chatRailStyle = {
    opacity: chatAnimation.threadOpacity,
    transform: `translate3d(0, ${chatAnimation.threadOffsetY}px, 0)`,
  } as CSSProperties;
  const scrollbarThumbStyle = {
    top: `${chatAnimation.scrollbarTop}px`,
    opacity: chatAnimation.threadOpacity,
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
                    <MockIcon name="sparkles" />
                  </div>
                  <div className="brandText">
                    <span className="brandName">{scene.sidebar.workspaceName}</span>
                    <span className="brandPlan">{scene.sidebar.workspacePlan}</span>
                  </div>
                </div>
                <div className="workspaceChevron">
                  <MockIcon name="chevron" />
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
                    <MockIcon name="sliders" />
                  </div>

                  <div className="historyList">
                    {scene.sidebar.historyItems.map((item, index) => (
                      <SidebarHistoryItem key={`${item.label}-${item.count ?? "none"}-${index}`} item={item} />
                    ))}
                  </div>
                </div>

                <div className="sidebarFooter">
                  <div className="avatar" />
                  <div className="footerText">
                    <span className="footerName">{scene.sidebar.footer.name}</span>
                    <span className="footerEmail">{scene.sidebar.footer.email}</span>
                  </div>
                  <div className="footerMenu">
                    <MockIcon name="sliders" />
                  </div>
                </div>
              </div>
            </aside>

            <section className="workspace">
              <div className="workspaceHeader">
                <span className="workspacePathIcon">
                  <MockIcon name="bars" />
                </span>
                <span className="workspacePathChevron">
                  <MockIcon name="chevron" />
                </span>
                <span className="workspaceTitle">{scene.workspace.title}</span>
              </div>

              <div className="workspaceCanvas">
                <div className="floatingAudio">
                  <div className="floatingAudioRow">
                    <span className="floatingAudioIcon">
                      <MockIcon name="audio" />
                    </span>
                    <div className="floatingAudioText">
                      <span className="floatingAudioTitle">{scene.workspace.floatingAudio.title}</span>
                      <span className="floatingAudioMeta">{scene.workspace.floatingAudio.extension}</span>
                    </div>
                    <span className="floatingAudioDuration">
                      {scene.workspace.floatingAudio.duration}
                    </span>
                  </div>
                </div>

                <div className="chatViewport">
                  <div className="chatRail" style={chatRailStyle}>
                    {chatAnimation.messages.map((message) => {
                      const messageStyle = {
                        opacity: message.appearProgress,
                        transform: getMessageTransform(message.role, message.appearProgress),
                      } as CSSProperties;

                      if (message.role === "user") {
                        return (
                          <div
                            key={message.id}
                            className="chatMessage chatMessageUser"
                            style={messageStyle}
                          >
                            <div className="chatUserBubble">
                              <span className="chatUserText">{message.content}</span>
                              <span className="chatUserTime">{message.timestamp}</span>
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
                        <div key={message.id} className={assistantClassName} style={messageStyle}>
                          <div className="chatAssistantContent">
                            {message.content.length > 0 ? message.content : <TypingDots />}
                            {message.isStreaming && message.content.length > 0 ? (
                              <span className="chatStreamCursor" aria-hidden="true" />
                            ) : null}
                          </div>

                          <div className="chatAssistantMeta">
                            <div
                              className="chatAssistantToolbar"
                              style={{ opacity: message.isComplete ? 1 : 0.32 }}
                            >
                              {message.utilityActions.map((iconName, index) => (
                                <span key={`${message.id}-${iconName}-${index}`} className="utilityIcon">
                                  <MockIcon name={iconName} />
                                </span>
                              ))}
                            </div>
                            <span className="chatAssistantTime">{message.timestamp}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="chatScrollbar" aria-hidden="true">
                    <div className="chatScrollbarThumb" style={scrollbarThumbStyle} />
                  </div>
                </div>

                <div className="composer">
                  <div className="composerPlaceholder">{scene.workspace.composer.placeholder}</div>
                  <div className="composerBottom">
                    <div className="composerTools">
                      <MockIcon name="paperclip" />
                      <MockIcon name="at" />
                    </div>

                    <div className="composerChip">
                      <MockIcon name="at" />
                      <span className="composerChipText">{scene.workspace.composer.chip}</span>
                      <MockIcon name="close" />
                    </div>

                    <div className="composerSend">
                      <MockIcon name="send" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider">
              <div className="dividerHandle">
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
                    <MockIcon name="chevron" />
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

              <div className="tabs">
                <div className="tabActive">
                  <MockIcon name="at" />
                  <span>{scene.inspector.tabs.primary}</span>
                </div>
                <div className="tabAction">
                  <MockIcon name={scene.inspector.tabs.secondaryIcon} />
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
  const [elapsedMs, setElapsedMs] = useState(0);
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

  useEffect(() => {
    const cycleDurationMs = scene.workspace.chat.cycleDurationMs;
    const animationStart = performance.now();
    const intervalId = window.setInterval(() => {
      setElapsedMs((performance.now() - animationStart) % cycleDurationMs);
    }, 72);

    return () => window.clearInterval(intervalId);
  }, [scene.variant, scene.workspace.chat.cycleDurationMs, scene.workspace.chat.messages.length]);

  return (
    <div ref={handleHostRef} aria-hidden="true" style={HOST_STYLE}>
      {shadowRoot
        ? createPortal(<ShadowMarkup layout={layout} scene={scene} elapsedMs={elapsedMs} />, shadowRoot)
        : null}
    </div>
  );
}

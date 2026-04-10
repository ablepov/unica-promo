"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from "react";
import { createPortal } from "react-dom";

import {
  OBSIDIAN_HERO_ARTBOARD,
  type ObsidianHeroMockAiMenuItem,
  type ObsidianHeroMockChatBubble,
  getObsidianHeroMockScene,
  type ObsidianHeroMockHistoryItem,
  type ObsidianHeroMockIcon,
  type ObsidianHeroMockLine,
  type ObsidianHeroMockNavItem,
  type ObsidianHeroMockScene,
  type ObsidianHeroMockSummarySection,
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
    cursor: default;
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
    position: relative;
    display: grid;
    width: var(--frame-width, 100%);
    grid-template-columns:
      var(--sidebar-width, 274px)
      minmax(0, 1fr)
      var(--divider-width, 1px)
      var(--inspector-width, 638px);
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

  .sidebarUltra {
    padding: 10px 0 18px;
  }

  .sidebarCompact {
    padding: 12px 0 20px;
  }

  .sidebarCompact .sidebarHeader {
    gap: 10px;
    padding: 14px 12px 10px 13px;
  }

  .sidebarCompact .brand {
    gap: 8px;
  }

  .sidebarCompact .brandText {
    max-width: 74px;
  }

  .sidebarCompact .brandPlan,
  .sidebarCompact .footerEmail,
  .sidebarCompact .footerMenu,
  .sidebarCompact .workspaceChevron,
  .sidebarCompact .historyHeading span,
  .sidebarCompact .navItemCount,
  .sidebarCompact .historyCount {
    display: none;
  }

  .sidebarCompact .sidebarBody {
    padding: 4px 7px 4px 8px;
  }

  .sidebarCompact .navItem,
  .sidebarCompact .historyItem {
    gap: 8px;
    min-height: 32px;
    padding: 5px 7px;
    font-size: 12px;
  }

  .sidebarCompact .navItemIcon,
  .sidebarCompact .historyItemIcon {
    width: 14px;
    height: 14px;
  }

  .sidebarCompact .navItemCount,
  .sidebarCompact .historyCount {
    font-size: 11px;
  }

  .sidebarCompact .historySection {
    margin-top: 12px;
  }

  .sidebarCompact .historyHeading {
    justify-content: flex-end;
    padding: 0 4px 7px 4px;
    font-size: 11px;
  }

  .sidebarCompact .sidebarFooter {
    justify-content: center;
    gap: 0;
    padding: 8px 0 5px;
  }

  .sidebarCompact .avatar {
    width: 30px;
    height: 30px;
  }

  .sidebarCompact .footerText {
    display: none;
  }

  .sidebarUltra .sidebarHeader {
    justify-content: center;
    padding: 12px 0 10px;
  }

  .sidebarUltra .brand {
    justify-content: center;
  }

  .sidebarUltra .brandText,
  .sidebarUltra .workspaceChevron,
  .sidebarUltra .historyHeading,
  .sidebarUltra .footerText,
  .sidebarUltra .footerMenu {
    display: none;
  }

  .sidebarUltra .brandMark {
    width: 28px;
    height: 28px;
  }

  .sidebarUltra .sidebarBody {
    padding: 4px 6px 2px;
  }

  .sidebarUltra .historySection {
    margin-top: 10px;
  }

  .sidebarUltra .historyList {
    gap: 3px;
    padding-right: 0;
  }

  .sidebarUltra .navItem,
  .sidebarUltra .historyItem {
    justify-content: center;
    gap: 0;
    min-height: 34px;
    padding: 8px 0;
  }

  .sidebarUltra .navItemLabel,
  .sidebarUltra .historyItemLabel,
  .sidebarUltra .navItemCount,
  .sidebarUltra .historyCount {
    display: none;
  }

  .sidebarUltra .historyItemIndented {
    padding-left: 0;
  }

  .sidebarUltra .sidebarFooter {
    justify-content: center;
    padding: 8px 0 4px;
  }

  .sidebarUltra .avatar {
    width: 28px;
    height: 28px;
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
    max-width: var(--brand-text-max-width, 148px);
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

  .navItemActive {
    background: rgba(255, 255, 255, 0.035);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  }

  .navItemDemoHover {
    background: rgba(55, 109, 221, 0.18);
    box-shadow:
      inset 0 0 0 1px rgba(93, 142, 239, 0.34),
      0 14px 28px rgba(10, 16, 28, 0.24);
  }

  .navItemDemoPressed {
    transform: translateY(1px);
    background: rgba(66, 120, 232, 0.24);
    box-shadow: inset 0 0 0 1px rgba(110, 156, 248, 0.44);
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
    z-index: 1;
  }

  .workspaceHeader {
    display: flex;
    align-items: center;
    height: 76px;
    padding:
      13px
      var(--workspace-header-pad-right, 24px)
      0
      var(--workspace-header-pad-left, 24px);
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
    padding:
      var(--workspace-pad-top, 20px)
      var(--workspace-pad-right, 24px)
      var(--workspace-pad-bottom, 26px)
      var(--workspace-pad-left, 32px);
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
    width: min(100%, var(--chat-max-width, 632px));
    max-width: var(--chat-max-width, 632px);
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

  .chatMessageIdle {
    align-self: center;
    max-width: var(--idle-message-max-width, 540px);
    margin-block: auto;
    text-align: center;
  }

  .chatMessageIdle .chatAssistantContent {
    text-align: center;
  }

  .chatMessageUser {
    align-self: flex-end;
    max-width: var(--chat-user-max-width, 336px);
  }

  .chatMessageFile {
    align-self: flex-end;
    max-width: var(--chat-file-max-width, 348px);
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
    max-width: var(--chat-user-max-width, 336px);
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

  .chatFileBubble {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    max-width: var(--chat-file-max-width, 348px);
    padding: 12px 14px;
    border-radius: 18px;
    background: rgba(30, 34, 42, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.24);
  }

  .chatFileIcon {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(17, 21, 29, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(244, 247, 255, 0.96);
    flex: none;
  }

  .chatFileText {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  .chatFileTitle {
    color: #fbfdff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chatFileExtension {
    color: rgba(186, 194, 209, 0.84);
    font-size: 12px;
    font-weight: 500;
  }

  .documentCard {
    position: relative;
    z-index: 1;
    width: min(100%, var(--chat-max-width, 632px));
    max-width: var(--chat-max-width, 632px);
    margin-inline: auto;
    padding: 18px 18px 16px;
    border-radius: 18px;
    background: rgba(22, 25, 32, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.26);
    overflow: hidden;
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

  .documentMeta {
    margin-top: 8px;
    color: rgba(174, 184, 201, 0.84);
    font-size: 13px;
    font-weight: 500;
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

  .documentPillHover {
    border-color: rgba(121, 150, 218, 0.54);
    background: rgba(39, 45, 57, 0.98);
    box-shadow: 0 10px 24px rgba(18, 28, 48, 0.2);
  }

  .documentCardProcessing .documentActions {
    display: none;
  }

  .documentProcessing {
    display: grid;
    gap: 14px;
    margin-top: 16px;
  }

  .documentProcessingStatus {
    color: rgba(230, 236, 247, 0.96);
    font-size: 14px;
    font-weight: 600;
  }

  .documentProcessingSteps {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .documentProcessingStep {
    min-height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    color: rgba(181, 190, 205, 0.78);
    background: rgba(25, 29, 37, 0.74);
    border: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .documentProcessingStepDone {
    color: rgba(235, 240, 248, 0.94);
    border-color: rgba(98, 118, 163, 0.3);
  }

  .documentProcessingStepActive {
    color: #ffffff;
    border-color: rgba(100, 148, 245, 0.42);
    background: rgba(34, 42, 58, 0.96);
    box-shadow: 0 10px 22px rgba(28, 52, 92, 0.26);
  }

  .documentProcessingMeter {
    position: relative;
    height: 5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  .documentProcessingMeterFill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: inherit;
    background:
      linear-gradient(90deg, rgba(70, 123, 233, 0.92), rgba(123, 176, 255, 0.92)),
      linear-gradient(90deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
    box-shadow: 0 0 24px rgba(73, 125, 235, 0.28);
  }

  .documentProcessingMeterFill::after {
    content: "";
    position: absolute;
    top: -6px;
    bottom: -6px;
    right: -38px;
    width: 72px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.34), transparent);
    opacity: 0.8;
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
    width: min(100%, var(--chat-max-width, 632px));
    max-width: var(--chat-max-width, 632px);
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

  .composerDrop {
    border-color: rgba(108, 162, 255, 0.98);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 0 0 1px rgba(93, 145, 249, 0.34),
      0 26px 56px rgba(32, 61, 114, 0.32);
  }

  .composerInput {
    min-height: 24px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
  }

  .composerInputEmpty {
    color: rgba(255, 255, 255, 0.01);
  }

  .composerInputDrop {
    color: rgba(239, 245, 255, 0.96);
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
    overflow: hidden;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.05));
  }

  .dividerHandle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(153, 163, 180, 0.62);
    transform: translate(-50%, -50%);
  }

  .inspector {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    min-width: 0;
    min-height: 0;
    height: 100%;
    overflow: hidden;
    background:
      radial-gradient(circle at 30% 18%, rgba(44, 83, 172, 0.08), transparent 20%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0)),
      #111318;
  }

  .inspectorShell {
    display: flex;
    flex-direction: column;
    width: var(--inspector-shell-width, 638px);
    min-width: var(--inspector-shell-width, 638px);
    max-width: var(--inspector-shell-width, 638px);
    min-height: 0;
    height: 100%;
    margin-left: auto;
    background: inherit;
    opacity: var(--inspector-shell-opacity, 1);
    transform: translate3d(calc((1 - var(--inspector-progress, 1)) * 36px), 0, 0);
    will-change: transform;
  }

  .inspectorOverlay {
    position: relative;
    overflow: visible;
    background: transparent;
    z-index: 6;
  }

  .inspectorOverlay .inspectorShell {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 7;
    background:
      radial-gradient(circle at 30% 18%, rgba(44, 83, 172, 0.08), transparent 20%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0)),
      #111318;
    border-left: 1px solid rgba(255, 255, 255, 0.055);
    box-shadow: -24px 0 54px rgba(6, 10, 18, 0.34);
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

  .inspectorTopInteractive {
    position: relative;
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

  .actionMenuWrap {
    position: relative;
    display: inline-flex;
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

  .actionButtonHover {
    box-shadow:
      0 16px 34px rgba(53, 118, 232, 0.34),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .actionButtonPressed {
    transform: translateY(1px);
    box-shadow:
      0 10px 24px rgba(53, 118, 232, 0.28),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
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

  .inspectorContent {
    display: grid;
    gap: 16px;
  }

  .transcriptBlock {
    color: #f6f9fe;
    font-size: 14px;
    line-height: 1.55;
  }

  .transcriptBlockRaw {
    overflow: hidden;
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

  .actionMenu {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    width: 192px;
    padding: 8px;
    border-radius: 14px;
    background: rgba(20, 24, 31, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 24px 54px rgba(0, 0, 0, 0.34);
    backdrop-filter: blur(12px);
  }

  .actionMenuItem {
    min-height: 36px;
    padding: 0 12px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    color: rgba(239, 244, 251, 0.92);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .actionMenuItemActive {
    background: rgba(54, 110, 221, 0.22);
    color: #ffffff;
    box-shadow: inset 0 0 0 1px rgba(103, 149, 243, 0.36);
  }

  .inspectorSummary {
    display: grid;
    gap: 14px;
  }

  .summarySection {
    display: grid;
    gap: 6px;
  }

  .summaryHeading {
    color: #f8fbff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .summaryBody {
    color: rgba(228, 235, 245, 0.95);
    font-size: 13px;
    line-height: 1.6;
  }

  .cursorLayer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 8;
  }

  .demoCursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    color: #f5f8ff;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.32));
  }

  .demoCursor svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .cursorFilePill {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    max-width: 290px;
    padding: 11px 14px;
    border-radius: 16px;
    background: rgba(28, 33, 41, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.26);
  }

  .cursorFileIcon {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(16, 20, 27, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(247, 250, 255, 0.94);
    flex: none;
  }

  .cursorFileText {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  .cursorFileTitle {
    color: #fbfdff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cursorFileMeta {
    color: rgba(180, 189, 204, 0.82);
    font-size: 12px;
    font-weight: 500;
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

type VariantLayoutMetrics = {
  frameWidth: number;
  sidebarWidth: number;
  chatWidth: number;
  inspectorWidth: number;
  workspacePadTop: number;
  workspacePadRight: number;
  workspacePadBottom: number;
  workspacePadLeft: number;
  workspaceHeaderPadLeft: number;
  workspaceHeaderPadRight: number;
  brandTextMaxWidth: number;
  idleMessageMaxWidth: number;
  chatUserMaxWidth: number;
  chatFileMaxWidth: number;
  overlayInspector: boolean;
};

const COMPACT_TO_ULTRA_SIDEBAR_THRESHOLD = 920;

function getMockLayout(
  width: number,
  height: number,
  variant: ObsidianHeroMockScene["variant"],
  frameWidth: number,
): MockLayout {
  const safeWidth = width || OBSIDIAN_HERO_ARTBOARD.width;
  const safeHeight = height || OBSIDIAN_HERO_ARTBOARD.height;
  const widthBasis =
    variant === "desktop" ? OBSIDIAN_HERO_ARTBOARD.width : frameWidth || OBSIDIAN_HERO_ARTBOARD.width;
  const scale = Math.max(
    safeWidth / widthBasis,
    safeHeight / OBSIDIAN_HERO_ARTBOARD.height,
  );
  const scaledWidth = OBSIDIAN_HERO_ARTBOARD.width * scale;
  const scaledHeight = OBSIDIAN_HERO_ARTBOARD.height * scale;
  const centeredOffsetX = (safeWidth - scaledWidth) / 2;

  return {
    width: safeWidth,
    height: safeHeight,
    scale,
    offsetX: variant === "desktop" ? centeredOffsetX : 0,
    offsetY: (safeHeight - scaledHeight) / 2,
  };
}

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getVariantLayoutMetrics(
  hostWidth: number,
  variant: ObsidianHeroMockScene["variant"],
): VariantLayoutMetrics {
  const safeHostWidth = hostWidth > 0 ? hostWidth : OBSIDIAN_HERO_ARTBOARD.width;

  switch (variant) {
    case "ultra":
      return {
        frameWidth: 440,
        sidebarWidth: 56,
        chatWidth: 300,
        inspectorWidth: 272,
        workspacePadTop: 10,
        workspacePadRight: 10,
        workspacePadBottom: 14,
        workspacePadLeft: 10,
        workspaceHeaderPadLeft: 10,
        workspaceHeaderPadRight: 10,
        brandTextMaxWidth: 0,
        idleMessageMaxWidth: 220,
        chatUserMaxWidth: 216,
        chatFileMaxWidth: 232,
        overlayInspector: true,
      };
    case "narrow":
      {
        const frameWidth = clampNumber(Math.round(safeHostWidth), 620, 760);
        const sidebarWidth = clampNumber(Math.round(frameWidth * 0.24), 148, 176);
        const inspectorWidth = clampNumber(Math.round(frameWidth * 0.48), 320, 368);
        const chatWidth = clampNumber(frameWidth - sidebarWidth - 42, 360, 448);

        return {
          frameWidth,
          sidebarWidth,
          chatWidth,
          inspectorWidth,
          workspacePadTop: 14,
          workspacePadRight: 14,
          workspacePadBottom: 18,
          workspacePadLeft: 16,
          workspaceHeaderPadLeft: 14,
          workspaceHeaderPadRight: 14,
          brandTextMaxWidth: 104,
          idleMessageMaxWidth: 320,
          chatUserMaxWidth: 250,
          chatFileMaxWidth: 272,
          overlayInspector: true,
        };
      }
    case "compact":
      {
        const denseSidebar =
          safeHostWidth <= COMPACT_TO_ULTRA_SIDEBAR_THRESHOLD;

        return {
          frameWidth: clampNumber(Math.round(safeHostWidth), 1020, 1180),
          sidebarWidth: denseSidebar ? 56 : clampNumber(Math.round(safeHostWidth * 0.19), 188, 228),
          chatWidth: clampNumber(Math.round(safeHostWidth * 0.53), 540, 620),
          inspectorWidth: clampNumber(Math.round(safeHostWidth * 0.46), 460, 520),
          workspacePadTop: 18,
          workspacePadRight: 18,
          workspacePadBottom: 22,
          workspacePadLeft: 22,
          workspaceHeaderPadLeft: 18,
          workspaceHeaderPadRight: 18,
          brandTextMaxWidth: denseSidebar ? 0 : 132,
          idleMessageMaxWidth: 480,
          chatUserMaxWidth: 312,
          chatFileMaxWidth: 328,
          overlayInspector: true,
        };
      }
    default:
      return {
        frameWidth: OBSIDIAN_HERO_ARTBOARD.width,
        sidebarWidth: 274,
        chatWidth: 632,
        inspectorWidth: 638,
        workspacePadTop: 20,
        workspacePadRight: 24,
        workspacePadBottom: 26,
        workspacePadLeft: 32,
        workspaceHeaderPadLeft: 24,
        workspaceHeaderPadRight: 24,
        brandTextMaxWidth: 148,
        idleMessageMaxWidth: 540,
        chatUserMaxWidth: 336,
        chatFileMaxWidth: 348,
        overlayInspector: false,
      };
  }
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

function easeInOutCubic(value: number) {
  const safeValue = clamp01(value);

  return safeValue < 0.5
    ? 4 * safeValue * safeValue * safeValue
    : 1 - Math.pow(-2 * safeValue + 2, 3) / 2;
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * clamp01(progress);
}

function mixPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  progress: number,
) {
  return {
    x: mix(from.x, to.x, progress),
    y: mix(from.y, to.y, progress),
  };
}

function quadraticPoint(
  from: { x: number; y: number },
  control: { x: number; y: number },
  to: { x: number; y: number },
  progress: number,
) {
  const safeProgress = clamp01(progress);
  const inverse = 1 - safeProgress;

  return {
    x:
      inverse * inverse * from.x +
      2 * inverse * safeProgress * control.x +
      safeProgress * safeProgress * to.x,
    y:
      inverse * inverse * from.y +
      2 * inverse * safeProgress * control.y +
      safeProgress * safeProgress * to.y,
  };
}

function rangeProgress(elapsedMs: number, startMs: number, endMs: number) {
  return clamp01((elapsedMs - startMs) / Math.max(1, endMs - startMs));
}

function getStreamedText(content: string, progress: number) {
  const characters = Array.from(content);
  const visibleCount = Math.ceil(characters.length * clamp01(progress));

  return characters.slice(0, visibleCount).join("");
}

type DemoChatBubbleState = {
  bubble: ObsidianHeroMockChatBubble;
  opacity: number;
  translateY: number;
};

type DemoSummarySectionState = {
  heading: string;
  body: string;
  opacity: number;
  translateY: number;
};

type DemoCursorState = {
  visible: boolean;
  x: number;
  y: number;
  pressed: boolean;
  showFile: boolean;
  fileOpacity: number;
};

type DemoCursorTargets = ObsidianHeroMockScene["workspace"]["loop"]["cursorTargets"];

type DemoState = {
  elapsedMs: number;
  frameStyle: CSSProperties;
  inspectorOpenProgress: number;
  inspectorContentOpacity: number;
  dividerOpacity: number;
  documentCardVisible: boolean;
  documentCardOpacity: number;
  documentCardTranslateY: number;
  documentProcessingStatus: string;
  documentProcessingStepIndex: number;
  documentProcessingProgress: number;
  documentActionsVisible: boolean;
  composerText: string;
  composerDrop: boolean;
  chatBubbles: readonly DemoChatBubbleState[];
  transcriptHover: boolean;
  transcriptPressed: boolean;
  actionButtonHover: boolean;
  actionButtonPressed: boolean;
  actionMenuOpen: boolean;
  actionMenuOpacity: number;
  hoveredMenuItemId: string | null;
  selectedMenuItemId: string | null;
  rewriteProgress: number;
  summarySections: readonly DemoSummarySectionState[];
  rawTranscriptHeight: number;
  newChatHover: boolean;
  newChatPressed: boolean;
  cursor: DemoCursorState;
};

function getBubbleVisibility(
  elapsedMs: number,
  appearAtMs: number,
  resetStartMs: number,
  resetEndMs: number,
  appearDurationMs = 260,
) {
  const appearProgress = easeOutCubic(rangeProgress(elapsedMs, appearAtMs, appearAtMs + appearDurationMs));
  const hideProgress =
    elapsedMs < resetStartMs
      ? 1
      : 1 - easeInOutCubic(rangeProgress(elapsedMs, resetStartMs, resetEndMs));

  return clamp01(appearProgress * hideProgress);
}

function getSummarySectionStates(
  sections: readonly ObsidianHeroMockSummarySection[],
  rewriteProgress: number,
): readonly DemoSummarySectionState[] {
  if (rewriteProgress <= 0) {
    return [];
  }

  return sections
    .map((section, index) => {
      const sectionStart = index / sections.length;
      const sectionEnd = (index + 1) / sections.length;
      const localProgress = rangeProgress(rewriteProgress, sectionStart, sectionEnd);

      if (localProgress <= 0) {
        return null;
      }

      const bodyProgress = easeOutCubic(rangeProgress(localProgress, 0.14, 1));

      return {
        heading: section.heading,
        body: getStreamedText(section.body, bodyProgress),
        opacity: easeOutCubic(rangeProgress(localProgress, 0.02, 0.18)),
        translateY: (1 - easeOutCubic(rangeProgress(localProgress, 0, 0.18))) * 8,
      };
    })
    .filter((value): value is DemoSummarySectionState => Boolean(value));
}

function areCursorTargetsEqual(
  current: Partial<DemoCursorTargets>,
  next: Partial<DemoCursorTargets>,
) {
  const keys = Object.keys({ ...current, ...next }) as (keyof DemoCursorTargets)[];

  return keys.every((key) => {
    const currentPoint = current[key];
    const nextPoint = next[key];

    if (!currentPoint && !nextPoint) {
      return true;
    }

    if (!currentPoint || !nextPoint) {
      return false;
    }

    return currentPoint.x === nextPoint.x && currentPoint.y === nextPoint.y;
  });
}

function getCursorState(
  scene: ObsidianHeroMockScene,
  elapsedMs: number,
  cursorTargets: DemoCursorTargets = scene.workspace.loop.cursorTargets,
): DemoCursorState {
  const { phases } = scene.workspace.loop;
  const hiddenState: DemoCursorState = {
    visible: false,
    x: 0,
    y: 0,
    pressed: false,
    showFile: false,
    fileOpacity: 0,
  };

  if (elapsedMs >= phases.idleEndMs && elapsedMs < phases.dragEndMs + 140) {
    const dragProgress = easeInOutCubic(rangeProgress(elapsedMs, phases.idleEndMs, phases.dragEndMs));
    const cursorPoint =
      elapsedMs < phases.dragEndMs
        ? quadraticPoint(
            cursorTargets.fileStart,
            { x: 1168, y: 358 },
            cursorTargets.composerDrop,
            dragProgress,
          )
        : cursorTargets.composerDrop;

    return {
      visible: true,
      x: cursorPoint.x,
      y: cursorPoint.y,
      pressed: elapsedMs >= phases.dragEndMs - 90,
      showFile: elapsedMs < phases.dragEndMs + 80,
      fileOpacity:
        elapsedMs < phases.dragEndMs
          ? 1
          : 1 - rangeProgress(elapsedMs, phases.dragEndMs, phases.dragEndMs + 140),
    };
  }

  if (elapsedMs >= phases.readyEndMs && elapsedMs < phases.inspectorOpenEndMs) {
    const transcriptMoveProgress = easeInOutCubic(
      rangeProgress(elapsedMs, phases.readyEndMs, phases.transcriptHoverEndMs),
    );
    const transcriptPoint =
      elapsedMs < phases.transcriptHoverEndMs
        ? quadraticPoint(
            cursorTargets.composerDrop,
            {
              x: mix(cursorTargets.composerDrop.x, cursorTargets.transcriptAction.x, 0.46),
              y: Math.min(cursorTargets.composerDrop.y, cursorTargets.transcriptAction.y) - 86,
            },
            cursorTargets.transcriptAction,
            transcriptMoveProgress,
          )
        : cursorTargets.transcriptAction;

    return {
      visible: true,
      x: transcriptPoint.x,
      y: transcriptPoint.y,
      pressed: elapsedMs >= phases.transcriptHoverEndMs - 90,
      showFile: false,
      fileOpacity: 0,
    };
  }

  if (elapsedMs >= phases.inspectorOpenEndMs && elapsedMs < phases.actionButtonEndMs) {
    const actionButtonStart = cursorTargets.transcriptAction;
    const actionButtonPoint = quadraticPoint(
      actionButtonStart,
      {
        x: mix(actionButtonStart.x, cursorTargets.aiActionButton.x, 0.52),
        y: Math.min(actionButtonStart.y, cursorTargets.aiActionButton.y) - 44,
      },
      cursorTargets.aiActionButton,
      easeInOutCubic(rangeProgress(elapsedMs, phases.inspectorOpenEndMs, phases.actionButtonEndMs)),
    );

    return {
      visible: true,
      x: actionButtonPoint.x,
      y: actionButtonPoint.y,
      pressed: elapsedMs >= phases.actionButtonEndMs - 90,
      showFile: false,
      fileOpacity: 0,
    };
  }

  if (elapsedMs >= phases.actionButtonEndMs && elapsedMs < phases.actionPickEndMs) {
    const menuTravelProgress = rangeProgress(elapsedMs, phases.actionButtonEndMs, phases.actionPickEndMs);
    const actionMenuPoint =
      menuTravelProgress < 0.34
        ? cursorTargets.aiActionButton
        : mixPoint(
            cursorTargets.aiActionButton,
            cursorTargets.aiActionMenuItem,
            easeInOutCubic(rangeProgress(menuTravelProgress, 0.34, 1)),
          );

    return {
      visible: true,
      x: actionMenuPoint.x,
      y: actionMenuPoint.y,
      pressed: elapsedMs >= phases.actionPickEndMs - 95,
      showFile: false,
      fileOpacity: 0,
    };
  }

  if (elapsedMs >= phases.pauseEndMs && elapsedMs < phases.newChatHoverEndMs) {
    const newChatStart = cursorTargets.aiActionButton;
    const newChatPoint = quadraticPoint(
      newChatStart,
      {
        x: mix(newChatStart.x, cursorTargets.newChat.x, 0.42),
        y: Math.min(newChatStart.y, cursorTargets.newChat.y) - 34,
      },
      cursorTargets.newChat,
      easeInOutCubic(rangeProgress(elapsedMs, phases.pauseEndMs, phases.newChatHoverEndMs)),
    );

    return {
      visible: true,
      x: newChatPoint.x,
      y: newChatPoint.y,
      pressed: elapsedMs >= phases.newChatHoverEndMs - 95,
      showFile: false,
      fileOpacity: 0,
    };
  }

  return hiddenState;
}

function getDemoState(
  scene: ObsidianHeroMockScene,
  elapsedMs: number,
  layoutMetrics: VariantLayoutMetrics,
): DemoState {
  const { phases, cycleDurationMs } = scene.workspace.loop;
  const currentElapsedMs = elapsedMs % cycleDurationMs;
  const resetStartMs = phases.newChatHoverEndMs;
  const resetEndMs = phases.resetEndMs;
  const processingSteps = scene.workspace.fileCard.processingSteps;
  const idleAssistantOpacity =
    currentElapsedMs < phases.dragEndMs + 40
      ? 1 - easeInOutCubic(rangeProgress(currentElapsedMs, phases.dragEndMs - 180, phases.dragEndMs + 40))
      : 0;
  const documentCardOpacity =
    currentElapsedMs < phases.dragEndMs
      ? 0
      : getBubbleVisibility(currentElapsedMs, phases.dragEndMs + 40, resetStartMs, resetEndMs, 220);
  const fileBubbleOpacity = getBubbleVisibility(
    currentElapsedMs,
    phases.dragEndMs + 70,
    resetStartMs,
    resetEndMs,
    220,
  );
  const readyAssistantOpacity = getBubbleVisibility(
    currentElapsedMs,
    phases.processingEndMs + 60,
    resetStartMs,
    resetEndMs,
    240,
  );
  const summaryAssistantOpacity = getBubbleVisibility(
    currentElapsedMs,
    phases.rewriteEndMs + 60,
    resetStartMs,
    resetEndMs,
    240,
  );
  const processingProgress = rangeProgress(currentElapsedMs, phases.dragEndMs, phases.processingEndMs);
  const rawStepIndex = Math.floor(processingProgress * processingSteps.length);
  const documentProcessingStepIndex =
    currentElapsedMs < phases.dragEndMs
      ? 0
      : currentElapsedMs < phases.processingEndMs
        ? Math.min(processingSteps.length - 1, rawStepIndex)
        : processingSteps.length - 1;
  const transcriptHoverStart = phases.readyEndMs + 180;
  const transcriptPressedStart = phases.transcriptHoverEndMs - 110;
  const actionButtonHoverStart = phases.inspectorOpenEndMs + 180;
  const actionButtonPressedStart = phases.actionButtonEndMs - 110;
  const menuOpenStart = phases.inspectorOpenEndMs + 360;
  const menuCloseStart = phases.actionPickEndMs - 120;
  const menuHoverStart = phases.actionButtonEndMs + 160;
  const newChatHoverStart = phases.pauseEndMs + 720;
  const newChatPressedStart = phases.newChatHoverEndMs - 110;
  let inspectorOpenProgress = 0;

  if (currentElapsedMs >= phases.transcriptHoverEndMs && currentElapsedMs < phases.inspectorOpenEndMs) {
    inspectorOpenProgress = easeInOutCubic(
      rangeProgress(currentElapsedMs, phases.transcriptHoverEndMs, phases.inspectorOpenEndMs),
    );
  } else if (currentElapsedMs >= phases.inspectorOpenEndMs && currentElapsedMs < resetStartMs) {
    inspectorOpenProgress = 1;
  } else if (currentElapsedMs >= resetStartMs && currentElapsedMs < resetEndMs) {
    inspectorOpenProgress =
      1 - easeInOutCubic(rangeProgress(currentElapsedMs, resetStartMs, resetEndMs));
  }

  const actionMenuOpacity =
    currentElapsedMs < menuOpenStart
      ? 0
      : currentElapsedMs < menuOpenStart + 140
        ? easeOutCubic(rangeProgress(currentElapsedMs, menuOpenStart, menuOpenStart + 140))
        : currentElapsedMs < menuCloseStart
          ? 1
          : currentElapsedMs < phases.actionPickEndMs
            ? 1 - easeInOutCubic(rangeProgress(currentElapsedMs, menuCloseStart, phases.actionPickEndMs))
            : 0;
  const rewriteProgress =
    currentElapsedMs < phases.actionPickEndMs
      ? 0
      : currentElapsedMs < phases.rewriteEndMs
        ? easeOutCubic(rangeProgress(currentElapsedMs, phases.actionPickEndMs, phases.rewriteEndMs))
        : 1;
  const summarySections = getSummarySectionStates(scene.inspector.summarySections, rewriteProgress);
  const rawTranscriptHeight =
    rewriteProgress <= 0
      ? 320
      : Math.max(0, 320 * (1 - easeInOutCubic(clamp01(rewriteProgress * 1.05))));

  const chatBubbles: DemoChatBubbleState[] = [];

  if (idleAssistantOpacity > 0.01) {
    chatBubbles.push({
      bubble: scene.workspace.chat.idleAssistant,
      opacity: idleAssistantOpacity,
      translateY: (1 - idleAssistantOpacity) * 12,
    });
  }

  if (fileBubbleOpacity > 0.01) {
    chatBubbles.push({
      bubble: scene.workspace.chat.fileBubble,
      opacity: fileBubbleOpacity,
      translateY: (1 - fileBubbleOpacity) * 18,
    });
  }

  if (readyAssistantOpacity > 0.01) {
    chatBubbles.push({
      bubble: scene.workspace.chat.readyAssistant,
      opacity: readyAssistantOpacity,
      translateY: (1 - readyAssistantOpacity) * 18,
    });
  }

  if (summaryAssistantOpacity > 0.01) {
    chatBubbles.push({
      bubble: scene.workspace.chat.summaryAssistant,
      opacity: summaryAssistantOpacity,
      translateY: (1 - summaryAssistantOpacity) * 18,
    });
  }

  const inspectorWidth = layoutMetrics.overlayInspector
    ? 0
    : layoutMetrics.inspectorWidth * inspectorOpenProgress;
  const dividerWidth = layoutMetrics.overlayInspector ? 0 : inspectorOpenProgress;

  return {
    elapsedMs: currentElapsedMs,
    frameStyle: {
      "--frame-width": `${layoutMetrics.frameWidth}px`,
      "--sidebar-width": `${layoutMetrics.sidebarWidth}px`,
      "--chat-max-width": `${layoutMetrics.chatWidth}px`,
      "--inspector-width": `${inspectorWidth}px`,
      "--inspector-shell-width": `${layoutMetrics.inspectorWidth}px`,
      "--inspector-shell-opacity": `${
        layoutMetrics.overlayInspector ? clamp01((inspectorOpenProgress - 0.02) / 0.14) : 1
      }`,
      "--divider-width": `${dividerWidth}px`,
      "--inspector-progress": `${inspectorOpenProgress}`,
      "--workspace-pad-top": `${layoutMetrics.workspacePadTop}px`,
      "--workspace-pad-right": `${layoutMetrics.workspacePadRight}px`,
      "--workspace-pad-bottom": `${layoutMetrics.workspacePadBottom}px`,
      "--workspace-pad-left": `${layoutMetrics.workspacePadLeft}px`,
      "--workspace-header-pad-left": `${layoutMetrics.workspaceHeaderPadLeft}px`,
      "--workspace-header-pad-right": `${layoutMetrics.workspaceHeaderPadRight}px`,
      "--brand-text-max-width": `${layoutMetrics.brandTextMaxWidth}px`,
      "--idle-message-max-width": `${layoutMetrics.idleMessageMaxWidth}px`,
      "--chat-user-max-width": `${layoutMetrics.chatUserMaxWidth}px`,
      "--chat-file-max-width": `${layoutMetrics.chatFileMaxWidth}px`,
    } as CSSProperties,
    inspectorOpenProgress,
    inspectorContentOpacity: clamp01((inspectorOpenProgress - 0.12) / 0.36),
    dividerOpacity: inspectorOpenProgress,
    documentCardVisible: documentCardOpacity > 0.01,
    documentCardOpacity,
    documentCardTranslateY: (1 - documentCardOpacity) * 16,
    documentProcessingStatus:
      currentElapsedMs < phases.dragEndMs
        ? processingSteps[0]
        : currentElapsedMs < phases.processingEndMs
          ? processingSteps[documentProcessingStepIndex]
          : processingSteps[processingSteps.length - 1],
    documentProcessingStepIndex,
    documentProcessingProgress: processingProgress,
    documentActionsVisible: currentElapsedMs >= phases.processingEndMs && currentElapsedMs < resetStartMs,
    composerText:
      currentElapsedMs >= phases.idleEndMs &&
      currentElapsedMs < phases.dragEndMs &&
      rangeProgress(currentElapsedMs, phases.idleEndMs, phases.dragEndMs) > 0.74
        ? scene.workspace.composer.dropText
        : scene.workspace.composer.idleText,
    composerDrop:
      currentElapsedMs >= phases.idleEndMs &&
      currentElapsedMs < phases.dragEndMs &&
      rangeProgress(currentElapsedMs, phases.idleEndMs, phases.dragEndMs) > 0.74,
    chatBubbles,
    transcriptHover:
      currentElapsedMs >= transcriptHoverStart && currentElapsedMs < phases.transcriptHoverEndMs + 40,
    transcriptPressed:
      currentElapsedMs >= transcriptPressedStart && currentElapsedMs < phases.transcriptHoverEndMs + 40,
    actionButtonHover:
      currentElapsedMs >= actionButtonHoverStart && currentElapsedMs < phases.actionPickEndMs,
    actionButtonPressed:
      currentElapsedMs >= actionButtonPressedStart && currentElapsedMs < menuOpenStart,
    actionMenuOpen: actionMenuOpacity > 0.02,
    actionMenuOpacity,
    hoveredMenuItemId:
      currentElapsedMs >= menuHoverStart && currentElapsedMs < phases.actionPickEndMs ? "summary" : null,
    selectedMenuItemId: currentElapsedMs >= phases.actionPickEndMs ? "summary" : null,
    rewriteProgress,
    summarySections,
    rawTranscriptHeight,
    newChatHover:
      currentElapsedMs >= newChatHoverStart && currentElapsedMs < phases.newChatHoverEndMs + 40,
    newChatPressed:
      currentElapsedMs >= newChatPressedStart && currentElapsedMs < resetStartMs + 40,
    cursor: getCursorState(scene, currentElapsedMs),
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

function getBubbleStyle(opacity: number, translateY: number): CSSProperties {
  return {
    opacity,
    transform: `translate3d(0, ${translateY}px, 0)`,
  };
}

function SidebarNavItem({
  item,
  hovered = false,
  pressed = false,
}: {
  item: ObsidianHeroMockNavItem;
  hovered?: boolean;
  pressed?: boolean;
}) {
  const className = [
    "navItem",
    item.active ? "navItemActive" : "",
    hovered ? "navItemDemoHover" : "",
    pressed ? "navItemDemoPressed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
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

function ChatBubbleView({
  state,
  idleAssistantId,
}: {
  state: DemoChatBubbleState;
  idleAssistantId: string;
}) {
  const { bubble, opacity, translateY } = state;

  if (bubble.kind === "userFile") {
    return (
      <div
        className="chatMessage chatMessageUser chatMessageFile"
        style={getBubbleStyle(opacity, translateY)}
      >
        <div className="chatFileBubble">
          <span className="chatFileIcon">
            <MockIcon name={bubble.icon ?? "audio"} />
          </span>
          <span className="chatFileText">
            <span className="chatFileTitle">{bubble.title}</span>
            <span className="chatFileExtension">{bubble.extension}</span>
          </span>
        </div>
      </div>
    );
  }

  const assistantClassName = [
    "chatMessage",
    "chatMessageAssistant",
    bubble.id === idleAssistantId ? "chatMessageIdle" : "",
    bubble.id === idleAssistantId ? "chatAssistantGreeting" : "chatAssistantResponse",
  ].join(" ");

  return (
    <div className={assistantClassName} style={getBubbleStyle(opacity, translateY)}>
      <div className="chatAssistantContent">{renderAssistantContent(bubble.content ?? "")}</div>
    </div>
  );
}

function SummarySectionView({ section }: { section: DemoSummarySectionState }) {
  return (
    <div className="summarySection" style={getBubbleStyle(section.opacity, section.translateY)}>
      <div className="summaryHeading">{section.heading}</div>
      <div className="summaryBody">{section.body}</div>
    </div>
  );
}

function ActionMenu({
  items,
  hoveredItemId,
  selectedItemId,
  opacity,
  summaryItemRef,
}: {
  items: readonly ObsidianHeroMockAiMenuItem[];
  hoveredItemId: string | null;
  selectedItemId: string | null;
  opacity: number;
  summaryItemRef?: { current: HTMLDivElement | null };
}) {
  return (
    <div
      className="actionMenu"
      style={{
        opacity,
        transform: `translate3d(0, ${mix(10, 0, opacity)}px, 0)`,
      }}
    >
      {items.map((item) => {
        const isActive = hoveredItemId === item.id || selectedItemId === item.id;

        return (
          <div
            key={item.id}
            className={`actionMenuItem ${isActive ? "actionMenuItemActive" : ""}`}
            ref={item.id === "summary" ? summaryItemRef : undefined}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

function CursorOverlay({
  cursor,
  fileBubble,
}: {
  cursor: DemoCursorState;
  fileBubble: ObsidianHeroMockChatBubble;
}) {
  if (!cursor.visible) {
    return null;
  }

  return (
    <div className="cursorLayer">
      <div
        className="demoCursor"
        style={{
          transform: `translate3d(${cursor.x - 3}px, ${cursor.y - 2}px, 0) scale(${cursor.pressed ? 0.97 : 1})`,
        }}
      >
        <svg viewBox="0 0 28 28" aria-hidden="true">
          <path
            d="M3 1.5 22.4 13 13.8 15.3 18.4 25.8 14.5 27 10 16.6 4.6 22.3 3 1.5Z"
            fill="currentColor"
            stroke="rgba(8, 11, 16, 0.72)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {cursor.showFile ? (
        <div
          className="cursorFilePill"
          style={{
            opacity: cursor.fileOpacity,
            transform: `translate3d(${cursor.x + 14}px, ${cursor.y - 10}px, 0)`,
          }}
        >
          <span className="cursorFileIcon">
            <MockIcon name={fileBubble.icon ?? "audio"} />
          </span>
          <span className="cursorFileText">
            <span className="cursorFileTitle">{fileBubble.title}</span>
            <span className="cursorFileMeta">{fileBubble.extension}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}

function ShadowMarkup({
  layout,
  scene,
  demo,
}: {
  layout: MockLayout;
  scene: ObsidianHeroMockScene;
  demo: DemoState;
}) {
  const artboardRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLDivElement | null>(null);
  const newChatRef = useRef<HTMLDivElement | null>(null);
  const transcriptActionRef = useRef<HTMLDivElement | null>(null);
  const actionButtonRef = useRef<HTMLDivElement | null>(null);
  const summaryMenuItemRef = useRef<HTMLDivElement | null>(null);
  const [measuredTargets, setMeasuredTargets] = useState<Partial<DemoCursorTargets>>({});
  const transformStyle = {
    transform: `translate3d(${layout.offsetX}px, ${layout.offsetY}px, 0) scale(${layout.scale})`,
  } as CSSProperties;
  const transcriptActionLabel = scene.workspace.fileCard.readyActions[0]?.label;
  const rawTranscriptOpacity =
    demo.rewriteProgress <= 0 ? 1 : mix(1, 0.26, easeInOutCubic(demo.rewriteProgress));
  const useDenseSidebar =
    scene.variant === "ultra" ||
    (scene.variant === "compact" &&
      layout.width <= COMPACT_TO_ULTRA_SIDEBAR_THRESHOLD);
  const sidebarClassName = [
    "sidebar",
    useDenseSidebar ? "sidebarUltra" : "",
    scene.variant === "compact" && !useDenseSidebar ? "sidebarCompact" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const inspectorClassName = [
    "inspector",
    scene.variant !== "desktop" ? "inspectorOverlay" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const resolvedCursorTargets: DemoCursorTargets = {
    ...scene.workspace.loop.cursorTargets,
    ...measuredTargets,
  };
  const resolvedCursor = getCursorState(scene, demo.elapsedMs, resolvedCursorTargets);
  const idleBubbleState = demo.chatBubbles.find(
    (state) => state.bubble.id === scene.workspace.chat.idleAssistant.id,
  );
  const fileBubbleState = demo.chatBubbles.find(
    (state) => state.bubble.id === scene.workspace.chat.fileBubble.id,
  );
  const remainingBubbleStates = demo.chatBubbles.filter(
    (state) =>
      state.bubble.id !== scene.workspace.chat.idleAssistant.id &&
      state.bubble.id !== scene.workspace.chat.fileBubble.id,
  );

  useLayoutEffect(() => {
    const artboardNode = artboardRef.current;

    if (!artboardNode) {
      return;
    }

    const artboardRect = artboardNode.getBoundingClientRect();
    const scale = layout.scale || 1;
    const nextTargets: Partial<DemoCursorTargets> = {};
    const measureTarget = (
      node: HTMLDivElement | null,
      key: keyof DemoCursorTargets,
      hotspot: { x: number; y: number } = { x: 0.5, y: 0.5 },
    ) => {
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();

      nextTargets[key] = {
        x: Math.round((rect.left - artboardRect.left + rect.width * hotspot.x) / scale),
        y: Math.round((rect.top - artboardRect.top + rect.height * hotspot.y) / scale),
      };
    };

    measureTarget(newChatRef.current, "newChat", { x: 0.32, y: 0.5 });
    measureTarget(composerRef.current, "composerDrop", { x: 0.54, y: 0.34 });
    measureTarget(transcriptActionRef.current, "transcriptAction");
    measureTarget(actionButtonRef.current, "aiActionButton");
    measureTarget(summaryMenuItemRef.current, "aiActionMenuItem");

    setMeasuredTargets((current) => {
      const mergedTargets = { ...current, ...nextTargets };

      return areCursorTargetsEqual(current, mergedTargets) ? current : mergedTargets;
    });
  }, [layout.scale, demo.documentActionsVisible, demo.actionMenuOpen, demo.inspectorOpenProgress]);

  const documentCardMarkup = demo.documentCardVisible ? (
    <div
      className={`documentCard ${demo.documentActionsVisible ? "" : "documentCardProcessing"}`}
      style={{
        opacity: demo.documentCardOpacity,
        transform: `translate3d(0, ${demo.documentCardTranslateY}px, 0)`,
      }}
    >
      <div className="documentTitleRow">
        <span className="documentTitle">{scene.workspace.fileCard.title}</span>
        <span className="documentTitleChevron">
          <MockIcon name="chevron" />
        </span>
      </div>
      <div className="documentMeta">{scene.workspace.fileCard.extension}</div>

      {!demo.documentActionsVisible ? (
        <div className="documentProcessing">
          <div className="documentProcessingStatus">{demo.documentProcessingStatus}</div>
          <div className="documentProcessingMeter">
            <div
              className="documentProcessingMeterFill"
              style={{ width: `${demo.documentProcessingProgress * 100}%` }}
            />
          </div>
          <div className="documentProcessingSteps">
            {scene.workspace.fileCard.processingSteps.map((step, index) => {
              const isDone = index < demo.documentProcessingStepIndex;
              const isActive = index === demo.documentProcessingStepIndex;

              return (
                <div
                  key={step}
                  className={[
                    "documentProcessingStep",
                    isDone ? "documentProcessingStepDone" : "",
                    isActive ? "documentProcessingStepActive" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {step}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="documentActions">
          {scene.workspace.fileCard.readyActions.map((action) => {
            const isTranscriptAction = action.label === transcriptActionLabel;
            const className = [
              "documentPill",
              action.active ? "documentPillActive" : "",
              demo.transcriptHover && isTranscriptAction ? "documentPillHover" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
                            <div
                              key={action.label}
                              className={className}
                              ref={isTranscriptAction ? transcriptActionRef : undefined}
                              style={
                                demo.transcriptPressed && isTranscriptAction
                                  ? { transform: "translateY(1px)" }
                    : undefined
                }
              >
                <MockIcon name="file" />
                <span>{action.label}</span>
                {action.active ? <MockIcon name="chevron" /> : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  ) : null;

  return (
    <>
      <style>{SHADOW_STYLES}</style>
      <div className="root">
        <div className="artboard" style={transformStyle} ref={artboardRef}>
          <div className="frame" style={demo.frameStyle}>
            <aside className={sidebarClassName}>
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
                  {scene.sidebar.primaryNav.map((item, index) => (
                    <div key={item.label} ref={index === 0 ? newChatRef : undefined}>
                      <SidebarNavItem
                        item={item}
                        hovered={index === 0 && demo.newChatHover}
                        pressed={index === 0 && demo.newChatPressed}
                      />
                    </div>
                  ))}
                </div>

                <div className="historySection">
                  <div className="historyHeading">
                    <span>{scene.sidebar.historyTitle}</span>
                    <MockIcon name="slidersHorizontal" />
                  </div>

                  <div className="historyList">
                    {scene.sidebar.historyItems.map((item, index) => (
                      <SidebarHistoryItem
                        key={`${item.label}-${item.count ?? "none"}-${index}`}
                        item={item}
                      />
                    ))}
                  </div>
                </div>

                <div className="sidebarFooter">
                  <div className="avatar">
                    <img src={SIDEBAR_AVATAR_SRC} alt="" className="avatarImage" />
                  </div>
                  <div className="footerText">
                    <span className="footerName">{scene.sidebar.footer.name}</span>
                    {scene.variant === "desktop" || scene.variant === "compact" ? (
                      <span className="footerEmail">{scene.sidebar.footer.email}</span>
                    ) : null}
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
                  {scene.variant !== "ultra" ? (
                    <>
                      <span className="workspaceSectionLabel">Транскрипция</span>
                      <span className="workspacePathChevron">
                        <MockIcon name="chevron" />
                      </span>
                    </>
                  ) : null}
                  <span className="workspaceTitle">{scene.workspace.title}</span>
                </div>
              </div>

              <div className="workspaceCanvas">
                <div className="chatViewport">
                  <div className="chatRail">
                    {idleBubbleState ? (
                      <ChatBubbleView
                        key={idleBubbleState.bubble.id}
                        state={idleBubbleState}
                        idleAssistantId={scene.workspace.chat.idleAssistant.id}
                      />
                    ) : null}
                    {fileBubbleState ? (
                      <ChatBubbleView
                        key={fileBubbleState.bubble.id}
                        state={fileBubbleState}
                        idleAssistantId={scene.workspace.chat.idleAssistant.id}
                      />
                    ) : null}
                    {documentCardMarkup}
                    {remainingBubbleStates.map((bubbleState) => (
                      <ChatBubbleView
                        key={bubbleState.bubble.id}
                        state={bubbleState}
                        idleAssistantId={scene.workspace.chat.idleAssistant.id}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className={`composer ${demo.composerDrop ? "composerDrop" : ""}`}
                  ref={composerRef}
                >
                  <div
                    className={[
                      "composerInput",
                      !demo.composerText ? "composerInputEmpty" : "",
                      demo.composerDrop ? "composerInputDrop" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {demo.composerText || "\u00A0"}
                  </div>
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

            <div className="divider" style={{ opacity: demo.dividerOpacity }}>
              <div className="dividerHandle">
                <MockIcon name="bars" />
              </div>
            </div>

            <aside className={inspectorClassName}>
              <div className="inspectorShell">
                <div className="inspectorTop" style={{ opacity: demo.inspectorContentOpacity }}>
                <div className="inspectorTitle">{scene.inspector.title}</div>
                <div className="inspectorActions">
                  <div className="actionMenuWrap">
                      <div
                        ref={actionButtonRef}
                        className={[
                          "actionButton",
                          demo.actionButtonHover ? "actionButtonHover" : "",
                        demo.actionButtonPressed ? "actionButtonPressed" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <MockIcon name="lightning" />
                      <span>{scene.inspector.actionLabel}</span>
                      <MockIcon name="chevronDown" />
                    </div>
                    {demo.actionMenuOpen ? (
                        <ActionMenu
                          items={scene.inspector.menuItems}
                          hoveredItemId={demo.hoveredMenuItemId}
                          selectedItemId={demo.selectedMenuItemId}
                          opacity={demo.actionMenuOpacity}
                          summaryItemRef={summaryMenuItemRef}
                        />
                      ) : null}
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

                <div className="inspectorBody" style={{ opacity: demo.inspectorContentOpacity }}>
                <div className="inspectorContent">
                  {demo.summarySections.length > 0 ? (
                    <div className="inspectorSummary">
                      {demo.summarySections.map((section) => (
                        <SummarySectionView key={section.heading} section={section} />
                      ))}
                    </div>
                  ) : null}

                  <div
                    className="transcriptBlock transcriptBlockRaw"
                    style={{
                      maxHeight: `${demo.rawTranscriptHeight}px`,
                      opacity: rawTranscriptOpacity,
                    }}
                  >
                    {scene.inspector.rawLines.map((line, index) => (
                      <TranscriptLine key={index} line={line} />
                    ))}
                  </div>

                  <div className="hint">{scene.inspector.hint}</div>
                </div>
                </div>
              </div>
            </aside>
          </div>

          <CursorOverlay cursor={resolvedCursor} fileBubble={scene.workspace.chat.fileBubble} />
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

  useEffect(() => {
    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      setElapsedMs(now - startTime);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const scene = getObsidianHeroMockScene(hostSize.width);
  const layoutMetrics = getVariantLayoutMetrics(hostSize.width, scene.variant);
  const layout = getMockLayout(
    hostSize.width,
    hostSize.height,
    scene.variant,
    layoutMetrics.frameWidth,
  );
  const demo = getDemoState(scene, elapsedMs, layoutMetrics);

  return (
    <div ref={handleHostRef} aria-hidden="true" style={HOST_STYLE}>
      {shadowRoot
        ? createPortal(<ShadowMarkup layout={layout} scene={scene} demo={demo} />, shadowRoot)
        : null}
    </div>
  );
}

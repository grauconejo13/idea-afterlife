# Decisions

This log records choices that meaningfully constrain product or implementation work.

## 001 — Product scope

**Decision:** Serve art, technology, inventions, stories, research, and community ideas rather than limiting the platform to software projects.

**Reason:** The emotional and practical problem crosses disciplines.

## 002 — Lineage over transfer

**Decision:** A revival creates a linked descendant record. The interface will not claim that clicking “revive” transfers legal ownership.

**Reason:** Attribution and history are central, while ownership depends on licenses, agreements, and jurisdiction.

## 003 — Explicit permission modes

**Decision:** Every published idea must display a permission mode.

**Reason:** Sharing publicly is not automatic permission to reproduce work.

## 004 — Editorial discovery first

**Decision:** Milestone 1 focuses on browsing, searching, filtering, viewing, and a mocked submission flow.

**Reason:** We should validate whether people understand and value the archive before building accounts, storage, and media infrastructure.

## 005 — Lightweight web scaffold

**Decision:** Begin with React, Vite, plain CSS, and local typed-style data structures expressed in JavaScript.

**Reason:** This keeps operating and development cost low while leaving room to introduce a backend after the interaction model stabilizes.

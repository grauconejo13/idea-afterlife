# Submission readiness checklist

This checklist bridges the Milestone 1 local preview and the future Milestone 2 persistent submission flow. It describes proposed acceptance criteria, not features that already exist.

## Before a creator can publish

- [ ] Sign in and confirm which creator profile owns the idea.
- [ ] Provide a clear title, summary, and category.
- [ ] Describe the idea's current state and what happened to it.
- [ ] Select a permission mode and explain any restrictions in plain language.
- [ ] Confirm that the creator has rights to share the submitted words and attachments.
- [ ] Review attribution, including any collaborators or third-party work.
- [ ] Preview the public entry and explicitly choose **Publish**.

## Drafts, attachments, and errors

- [ ] Save an unpublished draft without creating a public page.
- [ ] Validate required fields on both client and server.
- [ ] Show permitted file types and size limits before upload.
- [ ] Reject unsupported or oversized files safely.
- [ ] Preserve the user's input when validation or network errors occur.
- [ ] Let the owner edit or unpublish an entry; deny edits by other accounts.

## Revival lineage

- [ ] If a submission originates from another idea, retain the originating idea's identifier.
- [ ] Display the origin and attribution in the preview before publication.
- [ ] Do not interpret a permission badge as a legal transfer or automatic license.
- [ ] Require a separate permission check where a proposed reuse needs authorization.

## Release check

- [ ] Verify keyboard navigation and labeled validation messages.
- [ ] Check mobile layouts and low-bandwidth/error conditions.
- [ ] Test draft privacy and server-side ownership authorization.
- [ ] Test publish, edit, unpublish, and rejected-upload paths.
- [ ] Remove all language implying the current local preview already persists data.

**Out of scope for Milestone 2:** public revival publishing, creator acknowledgements, lineage visualization, and moderation workflows beyond minimum safety necessities. Those remain planned for later milestones in the roadmap.

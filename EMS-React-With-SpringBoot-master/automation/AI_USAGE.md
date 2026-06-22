# AI Usage Guidelines for Automation

This document explains how AI may be used to help develop the automation suite safely.

Allowed:
- Generate new tests under `automation/tests/`.
- Add new page objects under `automation/pages/`.
- Add new utilities under `automation/utils/`.
- Create or update `automation/data/` test fixtures.

Not allowed:
- Do not modify application source code (frontend, backend, or database configs).
- Do not change package dependencies outside `automation/` unless explicitly approved.
- Do not rename or delete existing application folders.

Process:
- Any AI-generated changes to automation should be reviewed by a human engineer.
- Keep commits small and descriptive; include test results with changes.

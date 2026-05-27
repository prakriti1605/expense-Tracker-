# TODO - fixes

- [ ] Fix 401 Unauthorized on /api/v1/expense
  - [ ] Patch `server/middleware/authMiddleware.js` to correctly import `User` model before using it
  - [ ] (Optional) Add better error details/logging in middleware to distinguish JWT_SECRET vs runtime errors
- [ ] Fix Recharts warnings (width/height -1)
  - [ ] Ensure chart containers have non-collapsing height in dashboard layout
- [ ] Re-test dashboard flow after auth fix


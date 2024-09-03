# RIA BUSANA PROJECT

## TODO
- [x] Tailwind auto sort
- [x] Setup the auth
- [x] Loading state on login
- [x] Can auth be fully server side?
- [x] implementing dynamic route
- [x] remove unused classes in sidebars-link component
- [x] make config directory for storing site configurations `https://github.com/shadcn-ui/taxonomy/blob/main/config`
- [x] create types directory `https://github.com/shadcn-ui/taxonomy/blob/main/types`
- [x] no importing config directly from component
- [x] click sidebars-link on mobile should close the sheet
- [x] is it possible to make the sidebar close after loading completed?
- [x] change blocks url path

#### High-Priority
- [x] `getProjects()` 
- [x] `getTasks()`

- [ ] fix the tim-pelaksana module
- [ ] refactor data table, schema, mocks and other stuff related to it
- [ ] set up database (decide what service should i use)
- [ ] integrate auth with firebase
- [ ] implement proper auth for manager and admin

#### Medium-Priority
- [x] change title placeholder for dashboard header
- [x] make sidebar much more DRY
- [x] top loading bar

- [ ] sentry
- [ ] change colors to blue-ish and add some 3d figures
- [ ] create breadcrumbs for navigation in the header
- [ ] add correct metadata for every page
- [ ] think about what should i put inside card content in home page
- [ ] implementing better redirect when login
- [ ] add a bar image ???

#### Low-Priority
- [ ] maybe think about adding checkmark on project list command so the user can see which project is fully completed
- [ ] why importing types using "@/types" instead of just "types"
- [ ] set good padding for sign out button
- [ ] create default variable in config for tim-pelaksana route

### Bugs:
- [x] `/undefined/tim-pelaksana` should return not-found instead (fixed by moving the data to layout)

#### Not Sure:
- [ ] dashboard layout (scroll and overfow)

- [x] middleware

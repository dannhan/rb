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

- [ ] migrate from promise.all to promise.allsettled

- [x] `getProjects()`
- [x] `getTasks()`
- [x] fix the tim-pelaksana module
- [x] refactor data table, schema, mocks and other stuff related to it
- [x] set up database (decide what service should i use)
- [x] integrate auth with firebase
- [x] implement proper auth for manager and admin
- [x] invalidate route after file uploading

#### Medium-Priority

- [x] change title placeholder for dashboard header
- [x] make sidebar much more DRY
- [x] top loading bar

- [ ] what is rate limit
- [ ] sentry
- [ ] change colors to blue-ish and add some 3d figures
- [ ] create breadcrumbs for navigation in the header
- [ ] add correct metadata for every page
- [ ] think about what should i put inside card content in home page
- [ ] implementing better redirect when login
- [ ] add a bar image ???

#### Low-Priority

- [ ] create default variable in config for tim-pelaksana route
- [ ] why importing types using "@/types" instead of just "types"
- [ ] set good padding for sign out button

### Bugs:

- [x] `/undefined/tim-pelaksana` should return not-found instead (fixed by moving the data to layout)

#### Not Sure:

- [ ] dashboard layout (scroll and overfow)

- [x] middleware

important todos:

- [ ] change the input language to be indonesian
- [ ] instead of calculating between two latitude and longitude use the google api instead
- [ ] improve the ui for the lokasi
- [ ] add better type safety and do type checking
- [ ] better error handling

## Notes

```ts
"use client";

// 1. Built-in imports
import * as React from "react";

// 2. Framework-specific imports (Next.js in this case)
import Image from "next/image";

// 3. Third-party library imports
import { toast } from "react-hot-toast"; // or whichever toast library you're using
import { Icon } from "lucide-react";
import { z } from "zod";

// 4. Local imports
// 4.1 Types
import { MyCustomType } from "@/types";

// 4.2 Schemas
import { identitySchema, projectSchema } from "@/config/schema";

// 4.3 Utilities and Helpers
import { cn } from "@/lib/utils";
import { auth } from "@/auth";

// 4.4 Components
import { Button } from "@/components/ui/button";
import { MyCustomComponent } from "@/components/MyCustomComponent";

// 4.5 Other local imports
import { someFunction } from "@/lib/someFunction";
```

next:

- improve the image styles, and also log-out button on home page
- refactor on login and logout button form component

prev:

- working on create design image category form but not yet implemented the dialog trigger, store it into db

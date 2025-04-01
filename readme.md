# CTX Blocks

CTX Blocks is a Wordpress Gutenberg Plugin. It includes some new blocks that come in handy for generic websites

### Description

CTX Blocks is built to extend the Gutenberg editor with practical, versatile blocks tailored for real-world use. Whether you're building landing pages, internal tools, or dynamic content sections, CTX Blocks equips you with components that are both intuitive for editors and flexible for developers.

It is developed with a focus on clean design, mobile responsiveness, and modern frontend practices (TailwindCSS, BEM, React where needed). Most blocks are customizable via block settings and CSS classes, and follow semantic HTML wherever possible.

### New Blocks

- **Grid** – Create responsive grid layouts with flexible column control for each screen size. Columns can be reordered on smaller devices.

- **Card** – A customizable card component with support for labels, badges, shadows, and color settings.

- **Description List** – A stylish list block with optional icons or images, captions, and descriptions.

- **Buttons** – A button block that supports links, JavaScript functions, and modal triggers.

- **Conditional** – Conditionally display content depending on date and time (more conditions planned).

- **Progress** – A progress bar for donations, project stats, or any other use case.

- **Image** - An alternative image-block that adds more options (round images, shadow, etc)

- **SVG** – Embed SVG graphics directly into the content.

### Installation

You’ll need SSH access and an installed npm environment. Then run the following commands to clone and build the plugin:

```sh
git clone https://github.com/gollenia/ctx-blocks.git
cd ctx-blocks
npm install
npm run build
```

Feel free, of course, to make use of GitHub's actions ;-)

### Changelog

##### 3.1.1 

-  Progress Bar fix

##### 3.1

-  NPM Packages Version Dump

##### 3.0

-  Upgraded to Block API 3.0
-  Image Block reworked

##### 2.0

-   Removed all Timber stuff and render most blocks through react
-   Removed alert, image, modal, header, footer, button-group, button-spacer, topbar, posts
-   Added SVG Block
-   Support for Wordpress 6.4
-   Make use of new Block registration System via block.json

##### 1.9.1

-   Bring back text align justify

##### 1.9

-   Adaptions to Wordpress 6
-   New blocks (section, header) for the template editor
-   Section gets deprecated for Groups

##### 1.8.1

-   Image can now have a link
-   Some translations fixed
-   More blocks moved to BEM-Style
-   Cards with links can now have child links

##### 1.8

-   New base block to force editors to use sections at base level
-   Redesigned Editor UI makes it easier to identify blocks
-   Description list improved
-   Some CSS moved to BEM Style (not all, yet)
-   Most blocks use useInnerBlocksProps() hook now

##### 1.7

-   Rewritten block registration to fit new block.json style and make it compatible with future Wordpress versions
-   Added spacer block to button-group
-   Many bug fixes
-   Grid and buttons now make use of the new useInnerBlocksProps() hook
-   All core blocks now have a "core-block" class for easier css

##### 1.6

-   All templates now use BEM-based classes
-   JavaScript for basic frontend functionality is now included
-   Modal block has been included into the button
-   Button can now have icon
-   description list and progress bar completely rewritten
-   The plugin now disables the standard wordpress Blocks like columns or image
-   A lot of bugfixes

##### 1.5.2

-   minor buffixes
-   card has now hover attribute
-   twig templates updated

##### 1.5.1

-   core/spacer now has auto-height feature for equalizing cards
-   cards now support button-groups
-   visibility switch has tailwind classes

##### 1.5

-   Cards now support labels and badges
-   New Block: Button Group
-   Normal buttons now support modals (modals block will be removed in 1.6)
-   Removed global block classes
-   Moved from Tailwind to component driven classes

##### 1.4

-   Upgraded to timber 2.0a
-   removed Accordion-Blocks
-   Progress bar completely rewritten

##### 1.3

-   Upgraded all Blocks to ApiVersion 2.0
-   Added language Support
-   New Block: Navigation
-   New Block: Posts

##### 1.2

-   New Block: Modal

##### 1.1

-   Introduced Twig
-   Moved from uiKit to Tailwindcss

##### 1.0

Initial release

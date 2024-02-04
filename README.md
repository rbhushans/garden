# garden

This VS Code extension adds a fun garden to the UI, and reminds you to drink water!

![beta demo](https://github.com/rbhushans/garden/blob/main/src/assets/documentation/garden_beta_demo.gif?raw=true)

## Features

Commands:

- Water - waters the plants
- Refresh - completely refreshes the plants

Can also drag to the VSCode Left Panel or within a subpanel (e.g. the file explorer)

## Requirements

- VSCode version > 1.77.0 (might work on older versions, but can't guarantee no bugs)

## Extension Settings

This extension contributes the following settings:

- `garden.plants`: Add or remove plants from the list of plants available. If there are duplicate plants, and one of them is removed, there's currently no reliable way to know which one will be removed.
- `garden.shouldNotify`: When this is enabled, the Garden extension will notify the user when it is time to water their plants (and drink water themselves!) This uses the water notification time value to determine the cadence of notifications.
- `garden.isModal`: When this is enabled, the Garden extension will use a modal to notify the user. This is a much more disruptive experience, but can be more effective when the goal is to grab attention.
- `garden.waterNotificationTime`: This is the time between notifications to water the plants, in minutes. The default value is 30 minutes. If shouldNotify is disabled, this value is ignored.
- `garden.waterAmount`: This is the amount to water the plants. The default is to fill the water bar, but a custom amount can be added.
- `garden.background`: This is the background/theme to be used for the garden. The look of the plants will change as well based on the chosen background.

## Known Issues

No major issues known at this time. For current bugs/features to be implemented, see bugs.md.

Current goal is to add updated icons and artwork before publishing to the VSCode marketplace.

## Release Notes

### 0.0.1

See releases for VSIX packaged extension - pre-release.

### 1.0.0 (Soon!)

Initial release of the Garden extension on VS Code!

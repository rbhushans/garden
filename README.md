<div align="center">
	<img src="assets/icons/logo.png" width="200" height="200">
	<h1>VSCode Garden</h1>
	<p>
		<b>Add a fun garden to your coding experience!</b>
	</p>
	<div align="center">
		<a href="https://marketplace.visualstudio.com/items?itemName=RohanBhushan.vsc-garden&ssr=false#version-history"><img src="https://img.shields.io/visual-studio-marketplace/v/RohanBhushan.vsc-garden?color=blue&logo=visual-studio"></a>
		<a href="https://marketplace.visualstudio.com/items?itemName=RohanBhushan.vsc-garden"><img src="https://vsmarketplacebadges.dev/downloads/RohanBhushan.vsc-garden.svg"></a>
		<a href="https://marketplace.visualstudio.com/items?itemName=RohanBhushan.vsc-garden&ssr=false#review-details"><img src="https://vsmarketplacebadges.dev/rating-star/RohanBhushan.vsc-garden.svg"></a>
	</div>
	<br/>
</div>

This VS Code extension adds a fun garden to the UI, and reminds you to drink water!

![beta demo](https://github.com/rbhushans/garden/blob/main/assets/documentation/garden_v2.0.0_demo.gif?raw=true)

## Features

Customize your garden!

- Long press on any empty space within the garden to bring up a modal to add a new plant
- Long press on any plant to remove it

Commands:

- Water - waters the plants
- Refresh - completely refreshes the plants
- Edit - opens the garden settings (see below for different settings)

Can also drag to the VSCode Left Panel or within a subpanel (e.g. the file explorer)

## Installation

Install the latest published version from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=RohanBhushan.vsc-garden).

Alternatively, see the latest releases on Github, and download the .vsix file. To install the file, go to the Extensions tab in VSCode, click the three dots at the top, and select "Install from VSIX", choose the downloaded file.

If the Garden window can't be found, click "CMD + SHIFT + P", search garden, and select the "Focus on Garden View" option.

## Requirements

- VSCode version > 1.77.0 (might work on older versions, but can't guarantee no bugs)

## Extension Settings

This extension contributes the following settings:

- `garden.plants`: Add or remove plants from the list of plants available. If there are duplicate plants, and one of them is removed, there's currently no reliable way to know which one will be removed if using the settings UI (the order is based on addition order) - to have more fine tuned control, just long press on the plant you want to remove.
- `garden.shouldNotify`: When this is enabled, the Garden extension will notify the user when it is time to water their plants (and drink water themselves!) This uses the water notification time value to determine the cadence of notifications.
- `garden.isModal`: When this is enabled, the Garden extension will use a modal to notify the user. This is a much more disruptive experience, but can be more effective when the goal is to grab attention.
- `garden.waterNotificationTime`: This is the time between notifications to water the plants, in minutes. The default value is 30 minutes. If shouldNotify is disabled, this value is ignored.
- `garden.waterAmount`: This is the amount to water the plants. The default is to fill the water bar, but a custom amount can be added.
- `garden.background`: This is the background/theme to be used for the garden. The look of the plants will change as well based on the chosen background.

## Known Issues

No major issues known at this time. For current bugs/features to be implemented, see bugs.md.

## Release Notes

See CHANGELOG.md

## Contributing

Constributions to the codebase are always welcome! See bugs.md for any open issues or improvements I've identified. If you would like to add a new theme to the extension, feel free to submit a PR.

## Artists

Backyard - https://brigessartprices.carrd.co/

Outside - Art of Elisa

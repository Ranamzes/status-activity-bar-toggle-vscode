import * as vscode from "vscode";

let barsVisible: boolean = true; // Global state to keep track of the bars' visibility

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"extension.status-activity-bar-toggle",
		() => {
			barsVisible = !barsVisible; // Toggle the global state

			const workbenchConfig = vscode.workspace.getConfiguration("workbench");

			// If for some reason the visibility state is undefined, exit early.
			if (barsVisible === undefined) {
				return;
			}

			// Set the visibility of both bars based on the global state
			// Utilizing Promise.all to execute both updates in parallel
			Promise.all([
				workbenchConfig.update(
					"activityBar.visible",
					barsVisible,
					vscode.ConfigurationTarget.Global
				),
				workbenchConfig.update(
					"statusBar.visible",
					barsVisible,
					vscode.ConfigurationTarget.Global
				),
			]);
		}
	);

	context.subscriptions.push(disposable);
}

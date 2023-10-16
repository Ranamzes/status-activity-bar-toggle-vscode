import * as vscode from "vscode";

let barsVisible: boolean = true; // Global state to keep track of the bars' visibility

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"extension.status-activity-bar-toggle",
		() => {
			// Removed async keyword as it's not strictly necessary here
			barsVisible = !barsVisible; // Toggle the global state

			// Set the visibility of both bars based on the global state
			// Utilizing Promise.all to execute both updates in parallel
			Promise.all([
				vscode.workspace
					.getConfiguration("workbench")
					.update(
						"activityBar.visible",
						barsVisible,
						vscode.ConfigurationTarget.Global
					),
				vscode.workspace
					.getConfiguration("workbench")
					.update(
						"statusBar.visible",
						barsVisible,
						vscode.ConfigurationTarget.Global
					),
			]);
		}
	);

	context.subscriptions.push(disposable);
}

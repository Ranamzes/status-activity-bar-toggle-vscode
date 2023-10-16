import * as vscode from "vscode";

let barsVisible: boolean = true; // Global state to keep track of the bars' visibility

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"extension.status-activity-bar-toggle",
		async () => {
			barsVisible = !barsVisible; // Toggle the global state

			// Set the visibility of both bars based on the global state
			await vscode.workspace
				.getConfiguration("workbench")
				.update(
					"activityBar.visible",
					barsVisible,
					vscode.ConfigurationTarget.Global
				);
			await vscode.workspace
				.getConfiguration("workbench")
				.update(
					"statusBar.visible",
					barsVisible,
					vscode.ConfigurationTarget.Global
				);
		}
	);

	context.subscriptions.push(disposable);
}

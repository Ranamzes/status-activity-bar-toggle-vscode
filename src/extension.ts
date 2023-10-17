import * as vscode from "vscode";

let barsVisible: boolean | undefined;  // Adjusted declaration

function getBarsVisibility(): boolean {
	const workbenchConfig = vscode.workspace.getConfiguration("workbench");
	// Ensure both values are boolean before returning their logical AND
	return !!workbenchConfig.get("activityBar.visible") && !!workbenchConfig.get("statusBar.visible");
}


export function activate(context: vscode.ExtensionContext) {
	barsVisible = getBarsVisibility();  // Sync the global state at activation
	let disposable = vscode.commands.registerCommand(
		"extension.status-activity-bar-toggle",
		() => {
			barsVisible = !barsVisible;  // Toggle the global state

			const workbenchConfig = vscode.workspace.getConfiguration("workbench");

			// Set the visibility of both bars based on the global state
			// Utilizing Promise.all to execute both updates in parallel
			Promise.all([
				workbenchConfig.update(
					"activityBar.visible",
					barsVisible,
					vscode.ConfigurationTarget.Workspace  // Adjusted target
				),
				workbenchConfig.update(
					"statusBar.visible",
					barsVisible,
					vscode.ConfigurationTarget.Workspace  // Adjusted target
				),
			]);
		}
	);

	context.subscriptions.push(disposable);
}

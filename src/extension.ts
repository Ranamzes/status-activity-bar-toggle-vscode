import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	initializeUIVisibility(context); // Initialize the UI state on activation

	let toggleUI = vscode.commands.registerCommand('extension.status-activity-bar-toggle', async () => {
		await toggleUIElements(context);
	});

	context.subscriptions.push(toggleUI);
}

export function deactivate() { }

async function initializeUIVisibility(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration();

	// Assume the bars are visible by default if settings are not set
	const activityBarVisible = config.get('workbench.activityBar.visible', true);
	const statusBarVisible = config.get('workbench.statusBar.visible', true);

	// Save the initial state in the global state
	await context.globalState.update('activityBarVisible', activityBarVisible);
	await context.globalState.update('statusBarVisible', statusBarVisible);

	// Initialize UI elements based on the settings
	if (!activityBarVisible) {
		await vscode.commands.executeCommand('workbench.action.toggleActivityBarVisibility');
	}
	if (!statusBarVisible) {
		await vscode.commands.executeCommand('workbench.action.toggleStatusbarVisibility');
	}
}

async function toggleUIElements(context: vscode.ExtensionContext) {
	console.log("Toggle bar command triggered");

	// Retrieve the current state from the globalState
	let activityBarVisible = context.globalState.get<boolean>('activityBarVisible', true);
	let statusBarVisible = context.globalState.get<boolean>('statusBarVisible', true);

	// Create an array of toggle promises without awaiting immediately
	const toggleCommands = [
		vscode.commands.executeCommand('workbench.action.toggleActivityBarVisibility'),
		vscode.commands.executeCommand('workbench.action.toggleStatusbarVisibility')
	];

	// Execute the toggles simultaneously
	await Promise.all(toggleCommands);

	// Update the visibility states after both commands have executed
	activityBarVisible = !activityBarVisible;
	statusBarVisible = !statusBarVisible;

	// Save the new states in parallel
	await Promise.all([
		context.globalState.update('activityBarVisible', activityBarVisible),
		context.globalState.update('statusBarVisible', statusBarVisible)
	]);
}


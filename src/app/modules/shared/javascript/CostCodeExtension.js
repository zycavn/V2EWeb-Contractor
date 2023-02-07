import { BaseExtension } from './BaseExtension.js';
import { CostCodePanel } from './CostCodePanel.js';

const av = Autodesk.Viewing;
const avu = Autodesk.Viewing.UI;
const avp = Autodesk.Viewing.Private;

class CostCodeExtension extends BaseExtension {
    constructor(viewer, options) {
        super(viewer, options);
        this._button = null;
        this._panel = null;
        this._costCodes = options.costCodes;

        // event callbacks
        this.onModelLayersInit = this.onModelLayersInit.bind(this);
        this.onModelAdded = this.onModelAdded.bind(this);
    }

    load() {
        console.log('CostCodeExtension loaded.');

        this.viewer.addEventListener(av.MODEL_ADDED_EVENT, this.onModelAdded);
        if (this.viewer.model) {
            this.onModelAdded({ model: this.viewer.model });
        }

        return true;
    }

    unload() {
        if (this._button) {
            this._removeToolbarButton(this._button);
            this._button = null;
        }
        if (this._panel) {
            this._panel.setVisible(false);
            this._panel.uninitialize();
            this._panel = null;
        }

        this.viewer.removeEventListener(av.MODEL_LAYERS_LOADED_EVENT, this.onModelLayersInit);
        this.viewer.removeEventListener(av.MODEL_ADDED_EVENT, this.onModelAdded)

        console.log('CostCodeExtension unloaded.');
        return true;
    }

    onToolbarCreated() {
        if (!this.viewer.hasEventListener(av.MODEL_LAYERS_LOADED_EVENT, this.onModelLayersInit)) {
            this.viewer.addEventListener(av.MODEL_LAYERS_LOADED_EVENT, this.onModelLayersInit);
        }
        if (this.viewer.impl.layers && this.viewer.impl.layers.initialized) {
            this.onModelLayersInit();
        }        
    }

    _createToolbarButton(buttonId, buttonIconUrl, buttonTooltip) {
        let group = this.viewer.toolbar.getControl('my-group');
        if (!group) {
            group = new Autodesk.Viewing.UI.ControlGroup('my-group');
            this.viewer.toolbar.addControl(group);
        }
        const button = new Autodesk.Viewing.UI.Button(buttonId);
        button.setToolTip(buttonTooltip);
        group.addControl(button);
        const icon = button.container.querySelector('.adsk-button-icon');
        if (icon) {
            icon.style.backgroundImage = `url(${buttonIconUrl})`;
            icon.style.backgroundSize = `24px`;
            icon.style.backgroundRepeat = `no-repeat`;
            icon.style.backgroundPosition = `center`;
        }
        return button;
    };

    createUI = function () {
        this._panel = new CostCodePanel(this.viewer, 'costcode-panel', 'Cost Codes', this._costCodes);
        this._button = this._createToolbarButton('costcode-button', 'https://img.icons8.com/material-outlined/48/stacked-organizational-chart.png', 'Cost Codes');

        this._button.onClick = () => {
            const { ACTIVE, INACTIVE } = Autodesk.Viewing.UI.Button.State;

            this._panel.setVisible(!this._panel.isVisible());
            this._button.setState(this._panel.isVisible() ? ACTIVE : INACTIVE);
        };
    };    

    removeLayersPanel = function () {
        if (this._panel) {
            this.viewer.removePanel(this._panel);
        
            this._panel.uninitialize();
            this._panel = null;
        }
    };
      
    onModelAdded = function (evt) {
        if (evt.model.is3d()) {            
            const layers = this.viewer.impl.layers;
            layers && layers.addModel(evt.model);
        }
    };    

    onModelLayersInit = function () {
        var layersRoot = this.viewer.impl.layers.getRoot();
        if (layersRoot && layersRoot.childCount > 0) {
            this.createUI();
        }
    };    

    _removeToolbarButton(button) {
        const group = this.viewer.toolbar.getControl('my-group');
        group.removeControl(button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('CostCodeExtension', CostCodeExtension);
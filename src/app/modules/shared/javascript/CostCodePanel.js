const av = Autodesk.Viewing;
const avu = Autodesk.Viewing.UI;
const avp = Autodesk.Viewing.Private;

const i18n = av.i18n;

class CostCodeDelegate extends Autodesk.Viewing.UI.TreeDelegate {
    _viewer = null;

    constructor(viewer) {
        super();
        this._viewer = viewer;
    }

    isTreeNodeGroup(node) {
        return node.drawingSubCodes && node.drawingSubCodes.length > 0;
    }

    getTreeNodeId(node) {
        return node.id;
    }

    getTreeNodeLabel(node) {
        return node.description;
    }

    getTreeNodeClass(node) {
        node.drawingSubCodes && node.drawingSubCodes.length > 0 ? 'group' : 'leaf';
    }

    forEachChild(node, callback) {
        for (const child of node?.drawingSubCodes) {
            if (child.drawingSubCodes && child.drawingSubCodes.length > 0) {
                var dadVisible = 0;
                for (var i = 0; i < child.drawingSubCodes.length; ++i) {                    
                    var childVisible = 0;
                    if (child.drawingSubCodes[i].layerName && this._viewer.impl.layers.layerToIndex[child.drawingSubCodes[i].layerName]) {
                        childVisible = this._viewer.impl.isLayerVisible(child.drawingSubCodes[i].layerName) ? 1 : 0;
                    }
                    dadVisible = dadVisible || childVisible;
                }
                
                if (dadVisible) {
                    callback(child);
                }
            }
            
            if (!child.drawingSubCodes) {
                if (child.layerName && this._viewer.impl.layers.layerToIndex[child.layerName]) {
                    callback(child);
                }
            }
        }
    }

    onTreeNodeClick(tree, node, event) {
        var arr = [];
        var visible = false;
        this._viewer.setLayerVisible(null, false, false);
        if (this.isTreeNodeGroup(node)) {
            for (var i = 0; i < node.drawingSubCodes.length; i++) {
                if (this._viewer.impl.layers.layerToIndex[node.drawingSubCodes[i].layerName]) {
                    arr.push(node.drawingSubCodes[i].layerName);
                    visible = this._viewer.impl.isLayerVisible(node.drawingSubCodes[i].layerName);
                }
            }
        } else {
            if (this._viewer.impl.layers.layerToIndex[node.layerName]) {
                this._viewer.setLayerVisible(node.layerName, !this._viewer.impl.isLayerVisible(node.layerName), false);
            }            
        }

        if (arr.length > 0) {
            this._viewer.setLayerVisible(arr, !visible, false);
        }
    }

    onTreeNodeDoubleClick(tree, node, event) {        
    }

    onTreeNodeRightClick(tree, node, event) {        
    }

    createTreeNode(node, parent, options, type, depth) {
        const label = super.createTreeNode(node, parent, options, type, depth);
        const icon = label.previousSibling;
        const row = label.parentNode;
        // Center arrow icon
        if (icon) {
            icon.style.backgroundPositionX = '5px';
            icon.style.backgroundPositionY = '5px';
        }
        // Offset rows depending on their tree depth
        row.style.padding = `5px`;
        row.style.paddingLeft = `${5 + (type === 'leaf' ? 20 : 0) + depth * 20}px`;

        // Add visibility button.
        const _document = this.getDocument();
        var button = _document.createElement('div');

        button.dbId = node;
        button.classList.add('visibility');
        button.title = i18n.translate("Show/hide this cost code");

        button.addEventListener('mousedown', function (event) {
            event.preventDefault();
            event.stopPropagation();
        }.bind(this));

        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            var arr = [];
            var visible = false;

            if (this.isTreeNodeGroup(node)) {
                for (var i = 0; i < node.drawingSubCodes.length; i++) {
                    if (this._viewer.impl.layers.layerToIndex[node.drawingSubCodes[i].layerName]) {
                        arr.push(node.drawingSubCodes[i].layerName);
                        visible = this._viewer.impl.isLayerVisible(node.drawingSubCodes[i].layerName);
                    }
                }
            } else {
                if (this._viewer.impl.layers.layerToIndex[node.layerName]) {
                    this._viewer.setLayerVisible(node.layerName, !this._viewer.impl.isLayerVisible(node.layerName), false);
                }
            }

            if (arr.length > 0) {
                this._viewer.setLayerVisible(arr, !visible, false);
            }
        }.bind(this));

        parent.appendChild(button);

        return label;
    }
}

export class CostCodePanel extends Autodesk.Viewing.UI.DockingPanel {
    constructor(viewer, id, title, costCode) {        
        super(viewer.container, id, title);
        this.container.classList.add('layers-panel');
        this.container.style.left = '0px';
        this.container.style.top = '0px';
        this.container.style.width = '400px';
        this.container.style.height = '600px';
        this.createScrollContainer({ left: false, heightAdjustment: 50, marginTop: 0 });
        this.costCode = costCode;
        this.delegate = new CostCodeDelegate(viewer);
        this.tree = new Autodesk.Viewing.UI.Tree(this.delegate, costCode, this.scrollContainer, { excludeRoot: true });

        // All visibility button.
        const _document = this.getDocument();
        var button = _document.createElement('div');

        button.classList.add('visibility');
        button.title = i18n.translate('Show/hide all cost codes');

        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            // viewer.setLayerVisible(null, viewer.allLayersHidden());
            this.toggleAllVisibleButton();
        }.bind(this));
        this.container.appendChild(button);
        this.toogleAllVisibleButton = button;

        var that = this;
        that.update();
        this.addEventListener(viewer, av.LAYER_VISIBILITY_CHANGED_EVENT, function () {
            that.update();
        });

        var shown = false;
        this.addVisibilityListener(function () {
            if (!shown) {
                shown = true;
                that.resizeToContent();
            }
        });
    }

    isAllCostCodesHidden() {
        var visible = false;
        for (const child of this.costCode?.drawingSubCodes) {
            for (const child1 of child?.drawingSubCodes) {
                var childVisible = false;
                if (child1.layerName && this.delegate._viewer.impl.layers.layerToIndex[child1.layerName]) {
                    childVisible = this.delegate._viewer.impl.isLayerVisible(child1.layerName) ? 1 : 0;
                }
                visible = visible || childVisible;
            }
        }

        return visible === 1 ? true : false;
    }

    toggleAllVisibleButton = function() {
        if (!this.isAllCostCodesHidden()) {
            for (const child of this.costCode?.drawingSubCodes) {
                for (const child1 of child?.drawingSubCodes) {
                    if (child1.layerName && this.delegate._viewer.impl.layers.layerToIndex[child1.layerName]) {
                        this.delegate._viewer.setLayerVisible(child1.layerName, true);
                    }
                }
            }
        } else {
            for (const child of this.costCode?.drawingSubCodes) {
                for (const child1 of child?.drawingSubCodes) {
                    if (child1.layerName && this.delegate._viewer.impl.layers.layerToIndex[child1.layerName]) {
                        this.delegate._viewer.setLayerVisible(child1.layerName, false);
                    }
                }
            }
        }
    }    

    update = function () {
        var that = this;

        function updateLook(node, state) {
            if (state === 0) {
                that.tree.addClass(node.id, 'dim');
            } else {// state === 1 || state === -1
                that.tree.removeClass(node.id, 'dim');
            }
        }

        function traverse(layerNode) {
            if (!that.delegate.isTreeNodeGroup(layerNode)) {
                if (that.delegate._viewer.impl.layers.layerToIndex[layerNode.layerName]) {
                    var visible = that.delegate._viewer.impl.isLayerVisible(layerNode.layerName) ? 1 : 0;
                    updateLook(layerNode, visible);
                    return visible;
                }
            } else {
                var children = layerNode.drawingSubCodes;
                var dadVisible = 0;
                for (var i = 0; i < children.length; ++i) {
                    var childVisible = traverse(children[i]);

                    if (children[i].layerName && !that.delegate._viewer.impl.layers.layerToIndex[children[i].layerName]) {
                        childVisible = 0;
                    }

                    if (!children[i].layerName && !children[i].drawingSubCodes) {
                        childVisible = 0;
                    }

                    dadVisible = dadVisible || childVisible;
                }
                updateLook(layerNode, dadVisible);
            }
        }

        traverse(this.costCode);

        // if (that.delegate._viewer.allLayersHidden()) {
        if (!that.isAllCostCodesHidden()) {
            this.toogleAllVisibleButton.classList.add('dim');
        } else {
            this.toogleAllVisibleButton.classList.remove('dim');
        }
    }

}

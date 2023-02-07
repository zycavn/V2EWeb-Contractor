/// import * as Autodesk from "@types/forge-viewer";
import './CostCodeExtension.js';

export function initViewer(container, access_token, expires_in, cost_codes) {
    return new Promise(function (resolve, reject) {
        var options = {            
            getAccessToken: function(onSuccess) {
                var accessToken = access_token;
                var expire = expires_in;
                onSuccess(accessToken, expire);
            }
        };
        var callback = function() {
            const config = {
                costCodes: cost_codes,
                extensions: [
                    'CostCodeExtension'
                ]
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start();
            viewer.setTheme('light-theme');
            resolve(viewer);
        }

        Autodesk.Viewing.Initializer(options, callback);        
    });
}

export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        function onDocumentLoadSuccess(doc) {
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
        }
        function onDocumentLoadFailure(code, message, errors) {
            reject({ code, message, errors });
        }
        viewer.setLightPreset(0);
        Autodesk.Viewing.Document.load(urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

export function loadModelFile(urn, access_token, expires_in, cost_codes) {
    initViewer(document.getElementById('forgeViewer'), access_token, expires_in, cost_codes).then(viewer => {
        loadModel(viewer, urn);
    });
}
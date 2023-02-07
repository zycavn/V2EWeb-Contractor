// Must include the "forge-viewer" reference
/// <reference types="forge-viewer" />

import { loadModelFile } from '../../javascript/viewer.js';

import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IntlService } from '@progress/kendo-angular-intl';
import { ViewerService } from 'src/app/data/autodesk/service/viewer.service';
import { DrawingViewModel } from 'src/app/data/shared/schema/autodesk-model';
import { DrawingCodeTree } from 'src/app/data/shared/schema/drawing-code-tree';
// import { PublicViewerService } from 'src/app/data/shared/service/public-viewer.service';

@Component({
  selector: 'app-home-display-model',
  templateUrl: './home-display-model.component.html',
  styleUrls: ['./home-display-model.component.scss']
})
export class HomeDisplayModelComponent implements OnInit {
  isLoading: boolean = true;
	hasError: boolean = false;
	errorMessage!: string;
  drawingViewModel: DrawingViewModel | undefined;
  referenceId!: string;
  viewer: Autodesk.Viewing.Viewer3D | undefined;

  public documentId!: string;

  constructor(@Inject(IntlService) private intlService: IntlService,
    private activatedRoute: ActivatedRoute,
    // private publicViewerService: PublicViewerService,
    private viewerService: ViewerService
  ) {}

  ngOnInit(): void {
    this.initialisePage();
  }

  ngOnDestroy(): void {
    if (this.viewer) {
      this.viewer!.finish();
    }
    Autodesk.Viewing.shutdown();
  }

  initialisePage() {
    //this.getModelId();
    this.loadModel();
  }

  // getModelId() {
  //   const id = this.activatedRoute.snapshot.queryParamMap.get('id');

  //   if (id !== null) {
  //     this.hasError = false;
  //     this.errorMessage = '';
  //     this.referenceId = id;
  //     this.loadModel();
  //   } else {
  //     this.displayErrorMessage(`Could not load the Job Drawings because the identifier for the job has not been provided.`);
  //   }
  // }

  loadModel() {
    // console.log(`Loading the model data from the API. Reference: ${this.referenceId}`);
    // if (this.referenceId === undefined) {
    //   this.displayErrorMessage('The ID for this Drawing has not been provided. Please try scanning the QR Code again.');
    //   return;
    // }

    const drawingViewModel: DrawingViewModel = {
      autodeskModel: {	
        id: 534,
        jobId: 510,
        jobName: "Turnkey Example",
        name: "EXAMPLE",
        description: "CLIENT",
        qrCode: "N/A",
        qrCodeUrl: "https://portal.vision2estimating.com.au/home/display-model?id=629c8aae-3885-41af-9bbe-186168f77613",
        modelJson: "N/A",
        bucketKey: "v2e-model-viewer",
        objectIdentifier: "urn:adsk.objects:os.object:v2e-model-viewer/qe21-0344%20-%20client.skp",
        objectKey: "qe21-0344 - client.skp",
        location: "https://developer.api.autodesk.com/oss/v2/buckets/v2e-model-viewer/objects/qe21-0344%20-%20client.skp",
        urn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6djJlLW1vZGVsLXZpZXdlci9xZTIxLTAzNDQlMjAtJTIwY2xpZW50LnNrcA"
      }
    };

    this.drawingViewModel = drawingViewModel;
    this.authenticateToForge(drawingViewModel);

		// this.publicViewerService.getModelByReferenceId(this.referenceId)
		// 	.subscribe({
		// 		next: (viewModel) => {
    //       // console.log(`viewmodel: ${JSON.stringify(viewmodel)}`);
    //       this.hasError = false;
    //       this.errorMessage = '';
    //       this.drawingViewModel = viewModel;
    //       this.authenticateToForge(viewModel);
		// 		},
		// 		error: (error) => {
		// 			this.isLoading = false;
    //       this.displayErrorMessage(`Could not load the Job Drawings. ${error.message}`);
    //       console.log('Error: ' + JSON.stringify(error));
    //     },
		// 		complete: () => {
		// 			this.isLoading = false;
		// 		}
		// 	});
  }

  authenticateToForge(drawingViewModel: DrawingViewModel) {
    this.viewerService.authenticate()
      .subscribe({
        next: (auth) => {
          console.log(`AUTH: ${JSON.stringify(auth)}`);
          this.displayModel(drawingViewModel, auth);
        },
        error: (error) => {
          this.isLoading = false;
          this.displayErrorMessage(`Could not authenticate with Autodesk services. ${error.error}`);
          console.log('Error: ' + JSON.stringify(error));
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  displayModel(drawingViewModel: DrawingViewModel, auth: any) {
    console.log('Loading the Autodesk Model');
    // console.log(`ViewModel: ${JSON.stringify(drawingViewModel)}`);
    const documentId = `urn:${drawingViewModel.autodeskModel.urn}`;

    let options: Autodesk.Viewing.InitializerOptions = {
      env: 'AutodeskProduction2',
      api: 'streamingV2', // for models uploaded to EMEA change this option to 'streamingV2_EU'
      getAccessToken: (onTokenReady: (arg0: string, arg1: number) => void): void => {
        let token = auth.access_token;
        let timeInSeconds = auth.expires_in; // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
      }
    } 

    // Autodesk.Viewing.Initializer(options, () => {
    //     console.log('Initialising Autodesk Viewer');
    //     let htmlDiv = document.getElementById('forgeViewer') as HTMLElement;

    //     const config = {
    //       extensions: [
    //           //'Autodesk.DocumentBrowser',
    //           //'LoggerExtension',
    //           //'SummaryExtension',
    //           //'HistogramExtension',
    //           //'DataGridExtension',
    //           // 'CostCodeExtension',
    //           //'CostCodesExtension'
    //           'Autodesk.DocumentBrowser',
    //           'MyExtension'
    //       ],
    //       // theme: "light-theme"
    //     };        
    //     this.viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config);

    //     console.log(`htmlDiv: ${htmlDiv}`);
    //     // console.log(`this.viewer: ${this.viewer}`);

    //     let startedCode = this.viewer.start();
    //     if (startedCode > 0) {
    //       this.displayErrorMessage(`Failed to create a Viewer: WebGL not supported. Code ${startedCode}.`);
    //       return;
    //     }

    //     // console.log('Initialization complete, loading a model next...');
    //     // Autodesk.Viewing.Document.load(
    //     //   documentId,
    //     //   (viewerDocument: Autodesk.Viewing.Document) => {
    //     //     this.onDocumentLoadSuccess(viewerDocument);
    //     //   },
    //     //   () => {
    //     //     this.onDocumentLoadFailure();
    //     //   }
    //     // );
    //   }
    // );

    let costCodes: any;
    this.viewerService
        .getCostCodes()
        .subscribe(data => {
          costCodes = JSON.stringify(data);

          let drawingCodeTree: DrawingCodeTree = <DrawingCodeTree>JSON.parse(costCodes);
          drawingCodeTree.id = -1;
          drawingCodeTree.drawingSubCodes = drawingCodeTree.drawingCodes;

          loadModelFile(documentId, auth.access_token, auth.expires_in, drawingCodeTree);
        });
  }

  onDocumentLoadSuccess(viewerDocument: Autodesk.Viewing.Document) {
    this.hasError = false;
    this.errorMessage = '';
    let viewables: Autodesk.Viewing.BubbleNode[] = viewerDocument.getRoot().search({ type: 'geometry' });
    this.viewer!.loadDocumentNode(viewerDocument, viewables[0]);
  }

  onDocumentLoadFailure() {
    this.displayErrorMessage('Failed to load the model from the Autodesk services.');
  }

  displayErrorMessage(message: string) {
    this.hasError = true;
    this.errorMessage = message;
  }
}

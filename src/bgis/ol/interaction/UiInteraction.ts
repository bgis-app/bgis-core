import {Map} from 'ol';
import Interaction, {InteractionOptions} from 'ol/interaction/Interaction';
import {registerResizeDetailsResetter, resizeDetails, resizeListView, toggleClassOnClick} from '../../util';

/**
 * An openlayer interaction implementation to automatically set some
 * class togglers and other event handlers.
 * We use this for our full feature demo to simulate external frameworks handling
 */
export class UiInteraction extends Interaction {

    /**
     * Constructor
     * @param options default OpenLayers interaction options
     */
    constructor(options?: InteractionOptions) {
        super(options);
    }

    /**
     * The overriden setMap method
     * @param map a map instance
     */
    setMap(map: Map): void {
        if (map) {
            //show app menu
            toggleClassOnClick(".bgis .bgis-search .bgis-app-menu", ".bgis", "showappmenu");

            //show search filter
            toggleClassOnClick(".bgis .bgis-search .bgis-search-showfilter", ".bgis .bgis-map-area", "show-search-filter");

            // legend
            toggleClassOnClick([".bgis .bgis-legend .bgis-showlegend", ".bgis .bgis-legend .bgis-hidelegend"], ".bgis .bgis-map-area", "show-legend");
            toggleClassOnClick(".bgis .bgis-legend .bgis-layers-tab", ".bgis .bgis-legend", "info");
            toggleClassOnClick(".bgis .bgis-legend .bgis-infos-tab", ".bgis .bgis-legend", "info");

            // schliesst die Listendarstellung
            toggleClassOnClick('.bgis .bgis-listview #bgis-listview-close', '.bgis-body', 'show-listview');

            // show and hide the sidebar
            toggleClassOnClick(".bgis .bgis-toggle-sidebar", ".bgis-map-area", 'hide-sidebar');

            // show and hide the header
            toggleClassOnClick([".bgis-hide-header", ".bgis-show-header"], ".bgis", 'hide-header');


            // show and hide the toolbar
            toggleClassOnClick(".bgis .bgis-hide-toolbar", ".bgis-map-area", 'show-toolbar');
            toggleClassOnClick(".bgis .bgis-toolbar-open", ".bgis-toolbar", 'open');


            // trigger viewport rerendering on toggle header
            document.querySelector(".bgis-hide-header")?.addEventListener("click", () => { window.dispatchEvent(new Event('resize')) });
            document.querySelector(".bgis-show-header")?.addEventListener("click", () => { window.dispatchEvent(new Event('resize')) });

            // show and hide the quicklinks
            toggleClassOnClick(".bgis .bgis-quicklink .bgis-quicklink-close", ".bgis-map-area", "hide-quicklink");

            // toggle details
            toggleClassOnClick([".bgis .bgis-hide-detail",".bgis .bgis-show-details"], ".bgis-map-area", "hide-details");

             // show and hide the basemap
            toggleClassOnClick(".bgis .bgis-basemap .bgis-basemap-close", ".bgis-map-area", "show-basemap");


            // resizer
            const listViewSplitter = document.querySelector(".bgis-listview-splitter");
            if (listViewSplitter) {
                resizeListView(listViewSplitter );
            }
            const detailSplitter = document.querySelector(".bgis-details-splitter");
            if (detailSplitter) {
                resizeDetails(detailSplitter);
                registerResizeDetailsResetter(detailSplitter);
            }

        } else {
            // TODO unregister
        }
        super.setMap(map);
    }



}


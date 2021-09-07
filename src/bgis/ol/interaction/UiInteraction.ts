import {Map} from 'ol';
import Interaction, {InteractionOptions} from 'ol/interaction/Interaction';
import {toggleClassOnClick} from '../../util/dom';
import {resizable, resizeDetails} from '../../util/splitter';

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
            toggleClassOnClick(".bgis .bgis-search .bgis-menu", ".bgis", "showappmenu");

            //show search filter
            toggleClassOnClick(".bgis .bgis-search .bgis-search-showfilter", ".bgis .bgis-search", "open");

            // legend
            toggleClassOnClick([".bgis .bgis-legend .bgis-showlegend", ".bgis .bgis-legend .bgis-hidelegend"], ".bgis .bgis-legend", "open");
            toggleClassOnClick(".bgis .bgis-legend .bgis-layers-tab", ".bgis .bgis-legend", "showinfos");
            toggleClassOnClick(".bgis .bgis-legend .bgis-infos-tab", ".bgis .bgis-legend", "showinfos");

            // schliesst die Listendarstellung
            toggleClassOnClick('.bgis .bgis-listview #bgis-listview-close', '.bgis', 'show-listview');

            // maximize map detail view
            toggleClassOnClick(".bgis .bgis-max-map", ".bgis-map-area", 'maximizemap');

            // show and hide the header
            toggleClassOnClick([".bgis .bgis-hide-header", ".bgis .bgis-show-header"], ".bgis-header", 'hide');

            // show and hide the sidebar
            toggleClassOnClick([".bgis .bgis-hide-sidebar", ".bgis .bgis-show-sidebar"], ".bgis-sidebar", "hide");
            toggleClassOnClick([".bgis .bgis-hide-sidebar", ".bgis .bgis-show-sidebar"], ".bgis-sidebar", "show-detail");

            // trigger viewport rerendering on toggle header
            document.querySelector(".bgis-hide-header")?.addEventListener("click", () => {window.dispatchEvent(new Event('resize'))});
            document.querySelector(".bgis-show-header")?.addEventListener("click", () => {window.dispatchEvent(new Event('resize'))});

            // show and hide the quicklinks
            toggleClassOnClick(".bgis .bgis-quicklink .bgis-quicklink-close", ".bgis-quicklink", "hide");

            // resizer
            const listViewSplitter = document.querySelector(".bgis-listview-splitter");
            if (listViewSplitter) {
                resizable(listViewSplitter, 'horizontal');
            }
            const detailSplitter = document.querySelector(".bgis-detail-splitter");
            if (detailSplitter) {
                resizeDetails(detailSplitter);
            }

        } else {
            // TODO unregister
        }
        super.setMap(map);
    }



}


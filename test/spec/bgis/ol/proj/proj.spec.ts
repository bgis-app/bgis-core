import {addAustrianProjections} from '../../../../../src/bgis/ol/proj';
import {get as getProjection} from 'ol/proj';
import {Geometry, LineString, Point} from 'ol/geom';

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
describe("Proj test", () => {

  addAustrianProjections();

  describe("Check the registered projections", () => {

    it("check EPSG:4326", () => {
      expect(getProjection("EPSG:4326")).not.toBeUndefined();
    });

    it("check EPSG:31287", () => {
      expect(getProjection("EPSG:31287")).not.toBeUndefined();
      // console.log(getProjection("EPSG:31287"));
      expect(getProjection("EPSG:31287")?.getExtent()).not.toBeUndefined();
    });

    it("check EPSG:31254", () => {
      expect(getProjection("EPSG:31254")).not.toBeUndefined();
      expect(getProjection("EPSG:31254")?.getExtent()).not.toBeUndefined();
    });
    it("check EPSG:31255", () => {
      expect(getProjection("EPSG:31255")).not.toBeUndefined();
      expect(getProjection("EPSG:31255")?.getExtent()).not.toBeUndefined();
    });
    it("check EPSG:31256", () => {
      expect(getProjection("EPSG:31287")).not.toBeUndefined();
      expect(getProjection("EPSG:31287")?.getExtent()).not.toBeUndefined();
    });
    it("check EPSG:32632", () => {
      expect(getProjection("EPSG:32632")).not.toBeUndefined();
      expect(getProjection("EPSG:32632")?.getExtent()).not.toBeUndefined();
    });
    it("check EPSG:32633", () => {
      expect(getProjection("EPSG:32633")).not.toBeUndefined();
      expect(getProjection("EPSG:32633")?.getExtent()).not.toBeUndefined();
    });

    it("check EPSG:3857 (Google, Basemap Austria)", () => {
      expect(getProjection("EPSG:3857")).not.toBeUndefined();
    });

    it("check NotDefined EPSG CODE (EPSG:9999999999999)", () => {
      expect(getProjection("EPSG:9999999999999")).toBeNull();
    });

  });

  describe("Check reprojection from WGS84 to Austria Lambert", () => {

    const projectionTo = "EPSG:31287";
    const projectionFrom = "EPSG:3857";

    const points = [{
      name: '100kmN26E43',
      to: [175452.571200000010000, 344618.484699999970000],
      from: [1155575.683600000100000, 5935988.346850000300000]
    }, {
      name: '100kmN26E44',
      to: [275246.346000000020000, 340265.391999999990000],
      from: [1301689.022960000000000, 5933935.515040000000000]
    }, {
      name: '100kmN26E45',
      to: [375044.723200000010000, 335829.028999999980000],
      from: [1447698.874570000000000, 5929287.716540000400000]
    }, {
      name: '100kmN27E45',
      to: [379399.202899999970000, 435762.099899999970000],
      from: [1453540.628610000000000, 6077110.666539999700000]
    }, {
      name: '100kmN26E46',
      to: [474854.100600000010000, 331309.853899999990000],
      from: [1593525.500280000000000, 5922053.190130000000000]
    }, {
      name: '100kmN27E46',
      to: [479233.181600000010000, 431224.983400000030000],
      from: [1601901.041890000000000, 6069603.523900000400000]
    }, {
      name: '100kmN28E46',
      to: [483672.364300000020000, 531118.163500000020000],
      from: [1610659.222270000000000, 6219647.565250000000000]
    }, {
      name: '100kmN26E47',
      to: [574680.961400000030000, 326708.729899999980000],
      from: [1739089.982090000100000, 5912244.709640000000000]
    }, {
      name: '100kmN27E47',
      to: [579082.901100000020000, 426600.038999999990000],
      from: [1749980.955409999900000, 6059426.475890000400000]
    }, {
      name: '100kmN27E48',
      to: [678954.515000000010000, 421888.620600000020000],
      from: [1897697.245000000100000, 6046598.297740000300000]
    }, {
      name: '100kmN28E47',
      to: [583563.256399999950000, 526466.842100000010000],
      from: [1761368.154110000000000, 6209076.944609999700000]
    }];


    it("check precision EPSG:3857 Google -> EPSG:31287 Lambert", () => {
      points.forEach((point) => {
        let geomStart = new Point(point.from);
        let geomExpected = new Point(point.to);
        let result: Geometry = geomStart.clone().transform(projectionFrom,
          projectionTo);
        if (result instanceof Point) {
          const line = new LineString([result.getCoordinates(), geomExpected.getCoordinates()]);
          expect(line.getLength()).toBeLessThan(0.01); // 1 cm
        } else {
          expect(false).toBe(true);
        }
      });
    });

    it("check precision EPSG:31287 Lambert -> EPSG:3857 Google -> EPSG:31287 Lambert", () => {
      points.forEach((point) => {
        let geomStart = new Point(point.to);
        let result = geomStart.clone().transform(projectionTo,
          projectionFrom).transform(projectionFrom,
          projectionTo);
        if (result instanceof Point) {
          let line = new LineString([geomStart.getCoordinates(), result.getCoordinates()]);
          expect(line.getLength()).toBeLessThan(0.01); // 1 cm
        } else {
          expect(false).toBe(true);
        }
      });
    });

  });

});

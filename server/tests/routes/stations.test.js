// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../../server");
// const server = require("../../server");
const METER_PER_MILE = 1609.34;

describe("Test /stations with different filters", () => {
  beforeAll(async () => {});
  afterAll(async () => {
    // await server.close();
  });

  test("pageSize limits num of stations returned; ", async () => {
    const resp = await request(app).get(`/stations?orderBy=sid&pageSize=3`);
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(3);
  });

  test("orderBy=distance returns stations with increasing distance to the location provided", async () => {
    const resp = await request(app).get(
      `/stations?streetAddress=Moore%20School%20Building&mileDistance=1&orderBy=distance&pageSize=10`
    );
    expect(resp.status).toEqual(200);
    for (let i = 0; i < resp.body.length - 1; i += 1) {
      expect(resp.body[i].meter_distance).toBeLessThanOrEqual(
        resp.body[i + 1].meter_distance
      );
    }
    expect(resp.body[resp.body.length - 1].meter_distance).toBeLessThanOrEqual(
      METER_PER_MILE
    );
    expect(resp.body.length).toBeGreaterThan(0);
  });

  test("page=1 starts from the next item of where page=0 ends", async () => {
    const resp = await request(app).get(
      `/stations?orderBy=sid&pageSize=3&page=1`
    );
    const resp3 = await request(app).get(
      `/stations?orderBy=sid&pageSize=3&page=2`
    );
    const resp6 = await request(app).get(`/stations?orderBy=sid&pageSize=6`);
    expect(resp.status).toEqual(200);
    expect(resp3.status).toEqual(200);
    expect(resp6.status).toEqual(200);
    expect(resp.body.length).toEqual(3);
    expect(resp3.body.length).toEqual(3);
    expect(resp6.body.length).toEqual(6);
    expect(resp.body[2].sid).toEqual(resp6.body[2].sid);
    expect(resp3.body[0].sid).toEqual(resp6.body[3].sid);
  });
});

describe("Test /stations/electric with different filters", () => {
  beforeAll(async () => {});
  afterAll(async () => {
    // await server.close();
  });
  test("orderBy=num_ports returns stations with descreasing total num_ports", async () => {
    const resp = await request(app).get(
      `/stations/electric?streetAddress=Moore%20School%20Building&mileDistance=1&orderBy=num_ports&pageSize=10`
    );
    expect(resp.status).toEqual(200);
    for (let i = 0; i < resp.body.length - 1; i += 1) {
      expect(resp.body[i].num_ports).toBeGreaterThanOrEqual(
        resp.body[i + 1].num_ports
      );
    }
    expect(resp.body[0].num_ports).toBeGreaterThan(0);
    expect(resp.body[resp.body.length - 1].num_ports).toBeGreaterThan(0);
    expect(resp.body.length).toBeGreaterThan(0);
  });

  test("Use 'stationPorts' filter to get only station with specified port types", async () => {
    const resp = await request(app).get(
      `/stations/electric?stationPorts=ccs,type1&pageSize=10`
    );
    expect(resp.status).toEqual(200);
    for (let i = 0; i < resp.body.length; i += 1) {
      // console.log(resp.body[i].port);
      expect(
        resp.body[i].port.includes("ccs") || resp.body[i].port.includes("type1")
      ).toBe(true);
    }
    expect(resp.body.length).toBeGreaterThan(0);
  });
});

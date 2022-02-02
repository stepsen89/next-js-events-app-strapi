'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async me(ctx) {
    const user = ctx.state.user;
    ctx.query = { ...ctx.query, filters: { user: { id: user.id } } };

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No Authorization header was found" }] },
      ]);
    }

    const entity = await strapi.service("api::event.event").find(ctx.query);

    if (!entity) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  // create event with linked user
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    console.log(ctx.request.body);
    entity = await strapi.service("api::event.event").create(ctx.request.body);
    return entity;
  },

  // update user event
  async update(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    console.log(events);
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.update(ctx);
    return entity;
  },

  // delete event

    async delete(ctx) {
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }
    const response = await super.delete(ctx);
    return response;
  },

}));

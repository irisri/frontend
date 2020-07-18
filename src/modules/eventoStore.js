import eventoService from "../services/eventoService.js";

export default {
  state: {
    eventos: [],
    currEvento: null,
    filterBy: {
      title: "",
      location: "",
      tag: "",
      time: "",
    },
  },

  getters: {
    eventos(state) {
      return state.eventos;
    },
    evento(state) {
      return state.currEvento;
    },
  },

  mutations: {
    setEventos(state, { eventos }) {
      state.eventos = eventos;
    },
    addEvento(state, { eventos }) {
      state.eventos.push(eventos);
    },
    removeEvento(state, { eventoId }) {
      state.eventos = state.eventos.filter((evento) => evento._id !== eventoId);
    },
    updateEvent(state, { evento }) {
      console.log("update", evento);
      const index = state.eventos.findIndex(
        (currEvento) => currEvento._id === evento._id
      );
      state.evento.splice(index, 1, evento);
      return evento;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setCurrEvento(state, { evento }) {
      state.currEvento = evento;
    },
  },

  actions: {
    async addEvento(context, { evento }) {
      event = await eventoService.add(evento);
      context.commit({ type: "addEvento", evento });
      return evento;
    },
    async saveEvento({ commit }, { evento }) {
      console.log(evento);
      if (evento.id) {
        return await eventoService.update(evento);
        // const updatedEvento = await eventoService.update(evento);
        // commit({ type: "updateEvento", evento: updatedEvento });
      } else {
        return await eventoService.save(evento);
      }
    },
    async getById({ commit }, { eventoId }) {
      const evento = await eventoService.getById(eventoId);
      commit({ type: "setCurrEvento", evento });
    },
    async loadEventos(context) {
      const eventos = await eventoService.query();
      context.commit({ type: "setEventos", eventos });
    },
    async removeEvento(context, { eventoId }) {
      await eventoService.remove(eventoId);
      context.commit({ type: "removeEvento", eventoId });
    },
  },
};

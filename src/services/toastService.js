export default {
    toastMsg
}

function toastMsg(that, payload) {
  console.log('payload', payload);
    that.$toasted.show(
        payload.msg,
        {
          className: "alert-toast",
          icon: payload.icon,
          duration: 5000,
          className: ["alert-toast"],
          position: "bottom-right",
        }
      );
}
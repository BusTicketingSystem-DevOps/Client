function Profile() {
  //   const getUser = async () => {
  //     try {
  //       dispatch(ShowLoading());
  //       const response = await axiosInstance.post(
  //         "/api/bookings/get-bookings-by-user-id",
  //         {}
  //       );
  //       dispatch(HideLoading());
  //       if (response.data.success) {
  //         const mappedData = response.data.data.map((booking) => {
  //           return {
  //             ...booking,
  //             ...booking.bus,
  //             key: booking._id,
  //           };
  //         });
  //         setBookings(mappedData);
  //       } else {
  //         message.error(response.data.message);
  //       }
  //     } catch (error) {
  //       dispatch(HideLoading());
  //       message.error(error.message);
  //     }
  //   };
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
export default Profile;

function status(request, response) {
  response.status(200).json({ status: "UP" });
}

export default status;

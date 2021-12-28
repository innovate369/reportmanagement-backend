const Profile = require('../models/profile');

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const getProfile = await Profile.find(id);
    res.send({
      msg: 'got profile successfully!',
      data: getProfile,
      status: 200
    })
  } catch (error) {
    res.send({ msg: error.msg, status: 400 });
  }
}

const addProfile = async (req, res) => {
  const {
    companyName,
    email,
    address,
    contactNum,
    gstNum,
    bankName,
    ifsc,
    ownerName,
    bankType,
    accountNum,
    panNum,
    logo
  } = req.body
  const newProfile = {
    companyName,
    email,
    address,
    contactNum,
    gstNum,
    bankName,
    ifsc,
    ownerName,
    bankType,
    accountNum,
    panNum,
    logo,
    logoName: req.files.logo[0].filename
  }
  const addProfile = await Profile.create(newProfile);
  res.send({ msg: 'New Profile added successfully!', data: addProfile, status: 200 });
}

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updateById = await Profile.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true
  })
  res.send({ msg: 'Profile updated succesfully!', data: updateById, status: 200 });
}

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteById = await Profile.findByIdAndDelete(id);
    res.send({
      msg: 'Profile deleted successfully!',
      data: deleteById,
      status: 200
    })
  } catch (e) {
    res.send({ msg: e.message, status: 400 });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
  addProfile
}

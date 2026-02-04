import React, { use, useEffect, useState } from 'react'
import AnimatedButton from '../ui/Other/AnimatedButton';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import SelectList from '../ui/Other/SelectList';
import { errorToast } from '../../utils/helper';
import { updateUserDetails, validateEmail } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);
  const [showCountriesMenu, setShowCountriesMenu] = useState(false);
  const [showGendersMenu, setShowGendersMenu] = useState(false);
  const [dailyGoal, setDailyGoal] = useState("");
  const [bio, setBio] = useState(user?.bio ? user?.bio : "");
  const [age, setAge] = useState(user?.age ? user?.age : "");
  const [country, setCountry] = useState(user?.country ? user?.country : "Not Set");
  const [gender, setGender] = useState(user?.gender ? user?.gender : "Not Set");
  const [disalbeSave, setDisalbeSave] = useState(false);

  useEffect(() => {
    if (user?.dailyGoal) {
      setDailyGoal(user.dailyGoal);
    }
  }, [user?.dailyGoal]);

  const handleSave = async () => {
    setDisalbeSave(true);
    if (age && age < 6 || age > 99) {
      toast("Age must be between 6 and 99", errorToast);
      return;
    }
    if (bio.length > 350) {
      toast("Bio must be less than 350 characters", errorToast);
      return;
    }
    if (dailyGoal < 0 || dailyGoal === null || dailyGoal > 100) {
      toast("Daily goal must be between 1 and 100", errorToast);
      return;
    }

    try {
      const response = await dispatch(
        updateUserDetails({
          email: user.email,
          dailyGoal,
          age,
          bio,
          country,
          gender,
        })
      );
      if (response?.payload?.status === 200) {
        setDisalbeSave(false);
      }
    } catch (error) {
      setDisalbeSave(false);
      return;
    }

  }

  const handleValidateEmail = async () => {
    try {
      const response = await dispatch(
        validateEmail()
      );
      if (response?.payload?.status === 200) {
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error(error)
      return;
    }

  }


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-bgprimary mb-[50px]  mt-[120px] flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            Account Settings
          </h5>
        </div>
        <div className="flex flex-col m-4 gap-2 py-4 px-5 border-2 border-bprimary rounded-2xl">
          <div className="grid grid-cols-7 gap-x-6 w-full">
            {/* Labels Column */}
            <div className="flex col-span-3 flex-col gap-4">
              {[
                "Username:",
                "Daily Goal:",
                "Email:",
                "Country:",
                "Age:",
                "Gender:",
                "Bio:",
              ].map((label, index) => (
                <>
                  {label === "Email:" ? (
                    <div className="flex gap-2 items-center">
                      <label
                        key={index}
                        className="font-route text-[21px] text-textcolor font-normal flex items-center h-[42px]"
                      >
                        {label}
                      </label>
                      {user?.isVerified ? (
                        <span className="text-textcolor text-sm font-main">
                          ( verified ✅ )
                        </span>
                      ) : (
                        <AnimatedButton
                          disabled={loading}
                          title={"VALIDATE EMAIL"}
                          onClick={handleValidateEmail}
                          className="bg-[#4865cd] font-bold rounded-md w-[105px] h-[26px] py-[3px] font-route text-md "
                        />
                      )}
                    </div>
                  ) : (
                    <label
                      key={index}
                      className="font-route text-[21px] text-textcolor font-normal flex items-center h-[42px]"
                    >
                      {label}
                    </label>
                  )}
                </>
              ))}
            </div>

            {/* Input Fields Column */}
            <div className="flex col-span-4 flex-col gap-4">
              {/* Username (Non-Editable) */}
              <div className="flex items-center h-[42px] pr-3 rounded-md text-textcolor font-main text-sm ">
                {user?.username}
              </div>

              {/* Editable Fields */}
              <input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                className="border-2 border-bprimary w-[260px] rounded-md placeholder-white outline-none font-main text-sm focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor h-[42px] flex items-center"
              />

              <input
                type="email"
                value={user?.email}
                className="border-2 border-bprimary w-full rounded-md placeholder-white outline-none font-main text-sm focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor h-[42px] flex items-center"
              />
              <div className="relative">
                {showCountriesMenu && (
                  <SelectList
                    type="country"
                    setValue={setCountry}
                    setOpen={setShowCountriesMenu}
                  />
                )}
                <input
                  type="text"
                  placeholder="Not Set"
                  value={
                    country &&
                    country.charAt(0).toUpperCase() + country.slice(1)
                  }
                  onClick={() => setShowCountriesMenu(!showCountriesMenu)}
                  className="border-2 border-bprimary w-full font-main text-sm rounded-md placeholder-white outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor h-[42px] flex items-center"
                />
              </div>
              <input
                type="number"
                placeholder="42"
                value={age}
                min={6}
                max={99}
                onChange={(e) => setAge(e.target.value)}
                className="border-2 border-bprimary w-full text-sm font-main rounded-md placeholder-secon
                 outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor h-[42px] flex items-center"
              />
              <div className="relative">
                {showGendersMenu && (
                  <SelectList
                    type="gender"
                    setOpen={setShowGendersMenu}
                    setValue={setGender}
                  />
                )}
                <input
                  type="text"
                  placeholder="Not Set"
                  value={
                    gender && gender.charAt(0).toUpperCase() + gender.slice(1)
                  }
                  onClick={() => setShowGendersMenu(!showGendersMenu)}
                  className="border-2 border-bprimary w-full rounded-md placeholder-white font-main text-sm outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor h-[42px] flex items-center"
                />
              </div>
              <div className="p-1">
                <textarea
                  rows={8}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Typing is fun..."
                  className="border-2 border-bprimary w-full rounded-md scrollbar-custom font-main text-sm outline-none focus:ring-0 py-2 px-2 bg-bgsecondary text-textcolor flex items-center"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <AnimatedButton
              title={"SAVE"}
              disabled={disalbeSave}
              onClick={handleSave}
              className="bg-primary border-bdshadow text-white font-bold rounded-lg px-4 py-[2px] font-route text-lg border-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings

import Image from "next/image";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi";
import { TbLockCog } from "react-icons/tb";
import { SiCoursera, SiThreedotjs } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { FiCamera } from "react-icons/fi";
import { useLogoutMutation } from "../redux/feature/auth/authApi";
import { signOut } from "next-auth/react";
import {
  useUpdateAvatarMutation,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
} from "../redux/feature/user/userApi";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";

const Profile = () => {
  const [sidebarCollapsed, setSideBarCollapse] = useState(true);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [logout] = useLogoutMutation();

  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarChange, setAvatarChange] = useState(false);
  const [updateAvatar, { isSuccess }] = useUpdateAvatarMutation();
  const fileInputRef = useRef(null);
  // const {PrevName} =
  const [name, setName] = useState(
    useSelector((state) => state.auth.user.name)
  );
  const [isNameChanged, setIsNameChanged] = useState(false);

  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, {}] = useUpdatePasswordMutation();

  const [updateUserInfo, {}] = useUpdateInfoMutation();

  const handleSubmit = async () => {
    if (isUpdatePassword) {
      try {
        await updatePassword({ oldPassword, newPassword: password });
        toast.success("Password updated successfully");
      } catch (error) {
        toast.error("Failed to update password");
      }
    }
    if (isNameChanged) {
      try {
        await updateUserInfo(name);
        toast.success("Name updated successfully");
      } catch (error) {
        toast.error("Failed to update password");
      }
    }
    if (avatarChange && selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = async () => {
        const base64String = reader.result;
        try {
          await updateAvatar(base64String).unwrap();
          toast.success("Avatar updated");
        } catch (error) {
          toast.error("Failed to update avatar");
        }
      };

      reader.onerror = (error) => {
        toast.error("Failed to update avatar");
      };
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      setAvatarChange(true);
      setSelectedFile(file);
    }
  };

  const logoutHandler = async () => {
    try {
      await logout();
      await signOut();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-screen h-screen flex sm:flex-row flex-col relative">
      <div className="w-full sm:hidden flex">
        <BsThreeDotsVertical className="m-[10px]" onClick={() => setSideBarCollapse(!sidebarCollapsed)}/>
      </div>
      {
        sidebarCollapsed && 
        <div className={`sm:w-[20%] sm:h-[80%] w-[70%] h-auto  sm:ml-[30px] ml-[10px] mt-[10px] rounded-[10px] bg-gradient-to-b from-gray-800 to-gray-900 ${sidebarCollapsed ? 'sm:flex' : 'hidden'}  flex-col justify-center items-center sm:relative absolute z-9999999999 top-[30px]`}>
        <div className="w-full p-[10px] flex gap-[10px] items-center ">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="profile picture"
              width={30}
              height={30}
              className="w-[30px] h-[30px] align-bottom object-cover rounded-full"
            />
          ) : (
            <HiOutlineUserCircle
              size={30}
              className="hidden md:block align-bottom cursor-pointer text-white "
            />
          )}
          <p className="text-white text-[20px]">My account</p>
        </div>

        <div className="w-[95%] h-[90%] m-[6px] p-[10px] rounded-[6px] bg-gradient-to-b from-gray-900 to-gray-950">
          <p
            className="flex items-end gap-[10px] my-[20px] cursor-pointer text-white"
            onClick={() => {
              setIsUpdatePassword(true);
              setAvatarChange(false);
            }}
          >
            <TbLockCog size={30} /> <span>Change Password</span>
          </p>
          <p className="flex items-end gap-[10px] mb-[20px] cursor-pointer text-white">
            <SiCoursera size={26} /> <Link href={'/enrolled-courses'}>Enrolled courses</Link>
          </p>
          {(user.role === "admin" || user.role === "teacher") && (
            <Link
              href={"/admin"}
              className="flex items-end gap-[10px] mb-[20px] cursor-pointer text-white"
            >
              <MdOutlineAdminPanelSettings size={30} /> <span>Admin dashboard</span>
            </Link>
          )}
          <p
            className="flex items-end gap-[10px] mb-[20px] cursor-pointer text-white"
            onClick={logoutHandler}
          >
            <AiOutlineLogout size={30} /> <span>Logout</span>
          </p>
        </div>
      </div>
      }
      <div className="w-full h-[80%] mt-[110px] flex flex-col items-center gap-8">
        {isUpdatePassword ? (
          <>
            <h1 className="font-bold text-3xl">Update your password</h1>
            <div className="w-[80%] flex flex-col items-center">
              <p className="self-start ml-[100px]">Enter current password</p>
              <input
                type="text"
                className="w-[80%] border border-white p-[5px] pl-[10px] rounded-2xl bg-transparent text-white"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="w-[80%] flex flex-col items-center">
              <p className="self-start ml-[100px]">Enter new password</p>
              <input
                type="text"
                className="w-[80%] border border-white p-[5px] pl-[10px] rounded-2xl bg-transparent text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-[80%] flex flex-col items-center">
              <p className="self-start ml-[100px]">Enter to confirm password</p>
              <input
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[80%] border border-white p-[5px] pl-[10px] rounded-2xl text-gray-300"
              />
            </div>
          </>
        ) : (
          <>
            <div
              onClick={handleIconClick}
              className="cursor-pointer rounded-full border-2 border-gray-400 relative overflow-hidden"
              style={{ width: 100, height: 100 }}
            >
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="profile picture"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              ) : (
                <HiOutlineUserCircle
                  size={100}
                  className="text-white "
                />
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  borderRadius: "50%",
                  padding: 6,
                }}
              >
                <FiCamera color="white" size={20} />
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div className="w-[80%] flex flex-col items-center">
              <p className="self-start ml-[100px] text-white">Full Name</p>
              <input
                type="text"
                value={name}
                className="w-[80%] border border-white p-[5px] pl-[10px] rounded-2xl bg-transparent text-white"
                onChange={(e) => {
                  setName(e.target.value);
                  setIsNameChanged(true);
                }}
              />
            </div>

            <div className="w-[80%] flex flex-col items-center">
              <p className="self-start ml-[100px] text-white">Email</p>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-[80%] border border-white p-[5px] pl-[10px] rounded-2xl bg-gray-700 text-gray-300 cursor-not-allowed"
              />
            </div>
          </>
        )}

        {/* Update button */}
        <div
          className="w-[80px] h-[30px] bg-blue-700 flex justify-center items-center rounded-2xl cursor-pointer"
          onClick={() => handleSubmit()}
        >
          Update
        </div>
      </div>
    </div>
  );
};

export default Profile;

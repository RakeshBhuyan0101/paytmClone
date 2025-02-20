import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [users, setUsers] = useState();
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/bulk?filter=" + filter
      );
      setUsers(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        { withCredentials: true }
      );
      setBalance(res.data.UserBalance.balance);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchBalance();
  }, [filter]);

  return (
    <div>
      <nav>
        <div className="flex justify-between p-5 m-5 border">
          <div className="text-xl font-bold">Paytm App</div>
          <div className="flex gap-2">
            hellow gmaail name
            <div className="size-9 rounded-full bg-gray-400  p-1 flex justify-center items-center">
              U
            </div>
          </div>
        </div>
      </nav>

      <div className="text-2xl font-bold ml-5">{`Your Balance RS ${balance} `}</div>
      <div className="text-1xl font-bold ml-5 mt-9">Users</div>

      <input
        onChange={(e) => setFilter(e.target.value)}
        type="search"
        placeholder="Search users.."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
      />

      {users &&
        users.map((user) => {
          return (
            <div className="w-full">
              <div className="flex justify-between border m-2 p-4 ">
                <div>
                  <h1 className="grid place-items-center">{user.username}</h1>
                  <span> {user.firstName}</span>
                  <span> {user.lastName}</span>
                </div>
                <button
                  onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                  className=" bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send money
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;

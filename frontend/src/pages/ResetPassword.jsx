import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import zxcvbn from "zxcvbn";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const score = zxcvbn(password).score;
  const labels = ["Too Weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-blue-500",
    "bg-green-500",
  ];
  const isWeak = password && score < 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");
    if (isWeak) return toast.error("Password is too weak");

    try {
      const res = await axios.post(
        `https://blog-yt-rqdo.onrender.com/api/v1/user/reset-password/${token}`,
        {
          password,
        }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          Reset Your Password
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              New Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="dark:bg-gray-900 dark:border-gray-700 mt-1"
            />
            {password && (
              <>
                <div className={`h-2 mt-2 rounded ${colors[score]}`} />
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  Strength: {labels[score]}
                </p>
              </>
            )}
          </div>

          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Confirm Password
            </Label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="dark:bg-gray-900 dark:border-gray-700 mt-1"
            />
          </div>

          <Button type="submit" className="w-full mt-2" disabled={isWeak}>
            Update Password
          </Button>

          {isWeak && (
            <p className="text-xs text-red-500 mt-1">
              Password is too weak. Please choose a stronger one.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

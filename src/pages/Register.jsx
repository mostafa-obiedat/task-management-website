import React, { useState, useEffect } from "react";
import { auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, setDoc, doc, firestore, database, set, ref, onValue, get } from '../firebase/firebaseConfig';
import { FaGoogle } from 'react-icons/fa';



// Regex patterns for email, password, and phone number validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const phoneNumberPattern = /^07\d{8}$/;

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTextMoving, setIsTextMoving] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleToggleForm = () => {
    setIsTextMoving(true);
    setRegistrationMessage(""); // مسح الرسالة عند التبديل
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setIsAnimating(false);
    }, 400);
    setIsAnimating(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setRegistrationMessage("Please fill in all fields.");
      return;
    }

    try {
      if (isSignUp) {
        // 🟢 تسجيل حساب جديد
        const username = form.username?.value;
        const phoneNumber = form.phoneNumber?.value;
        const role = form.role?.value;

        if (!username || !phoneNumber) {
          setRegistrationMessage("Please fill in all fields.");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = { uid: user.uid, username, email, phoneNumber, role };
        await set(ref(database, `users/${user.uid}`), userData);

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("uid", user.uid);

        setRegistrationMessage("Registration successful!");
        setTimeout(() => {
          window.location.href = "./dashboard";
        }, 1000);
      } else {
        // 🔵 تسجيل الدخول
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🟢 جلب بيانات المستخدم
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          let userData = snapshot.val();

          // 🔹 إضافة uid إلى userData لحفظه في localStorage بنفس الطريقة عند التسجيل
          userData = { ...userData, uid: user.uid };

          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("uid", user.uid);

          setRegistrationMessage("Login successful!");
          setTimeout(() => {
            window.location.href = "./dashboard";
          }, 1000);
        } else {
          setRegistrationMessage("User data not found.");
        }
      }
    } catch (error) {
      console.error("Login error:", error.code);
      if (error.code === "auth/invalid-credential") {
        setRegistrationMessage("Incorrect password! Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setRegistrationMessage("No account found with this email.");
      } else {
        setRegistrationMessage(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // جلب بيانات المستخدم من Firebase
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        setRegistrationMessage("User data not found in the database.");
        return;
      }

      // جلب بيانات المستخدم وحفظها
      let userData = snapshot.val();

      // التأكد من وجود `role` و `phoneNumber` داخل بيانات المستخدم
      userData = {
        ...userData,
        username: userData.username || user.displayName.split(" ")[0],  // استخدام الاسم الأول إذا لم يكن موجودًا
        email: userData.email || user.email,
        uid: userData.uid || user.uid,
        phoneNumber: userData.phoneNumber || "Not Provided",
        role: userData.role || "team member",
      };

      // حفظ البيانات في LocalStorage
      localStorage.setItem("userData", JSON.stringify(userData));


      setRegistrationMessage("Google login successful!");

      setTimeout(() => {
        window.location.href = "./dashboard";
      }, 1000);
    } catch (error) {
      setRegistrationMessage(error.message);
    }
  };


  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const [username] = user.displayName ? user.displayName.split(" ") : ["", ""];
      const userData = {
        username,
        email: user.email,
        uid: user.uid,
        role: "team member", // ✅ تعيين "team member" كافتراضي للمستخدمين المسجلين عبر جوجل
      };

      await set(ref(database, `users/${user.uid}`), userData);

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("uid", user.uid);

      setRegistrationMessage("Google sign-up successful!");
      setTimeout(() => {
        window.location.href = "./dashboard";
      }, 4000);
    } catch (error) {
      setRegistrationMessage(`${error.message}`);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = { username: user.displayName, email: user.email, uid: user.uid };
        await setDoc(doc(firestore, "users", user.uid), userData);
        await set(ref(database, `users/${user.uid}`), userData);

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isNewUser", "true");
        localStorage.setItem("uid", user.uid);

        setRegistrationMessage("Google sign-in successful!");

        setTimeout(() => {
          window.location.href = "./dashboard"; // Redirect to homepage
        }, 4000);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className={`flex-1 flex flex-col justify-center items-center bg-white p-10 transition-all duration-1000 ease-in-out ${isSignUp && !isAnimating ? "" : "transform translate-x-full"}`}>
        {/* رسالة الخطأ أو النجاح */}
        {registrationMessage && (
          <p className="text-red-600 mb-4">{registrationMessage}</p>
        )}

        {isSignUp ? <SignupForm handleSubmit={handleSubmit} handleGoogleSignUp={handleGoogleSignUp} /> : <SigninForm handleSubmit={handleSubmit} handleGoogleSignIn={handleGoogleSignIn} />}
      </div>

      <div className={`flex-1 flex flex-col justify-center items-center text-white p-10 relative transition-all duration-1000 ease-in-out ${isSignUp && !isAnimating ? "" : "transform -translate-x-full"}`} style={{ backgroundColor: "#A020F0" }}>
        <div className="absolute w-48 h-48 bg-purple-900 rounded-bl-full opacity-50" style={{ top: "0px", right: "0px" }}></div>
        <div className="absolute w-48 h-48 bg-purple-900 rounded-tr-full opacity-50" style={{ bottom: "0px", left: "0px" }}></div>

        <h2 className={`text-2xl font-bold z-10 transform transition-all duration-1000 ease-in-out ${isTextMoving && !isSignUp ? "translate-x-[100vw]" : isTextMoving && isSignUp ? "-translate-x-[100vw]" : "translate-x-0"}`}>
          {isSignUp ? "Already a member? Let's get things done!" : "New here? Let's organize your tasks!"}
        </h2>
        <p className={`mt-2 text-center z-10 transform transition-all duration-1000 ease-in-out ${isTextMoving && !isSignUp ? "translate-x-[100vw]" : isTextMoving && isSignUp ? "-translate-x-[100vw]" : "translate-x-0"}`}>
          {isSignUp ? "Welcome back to your task management hub. Stay organized, prioritize tasks, and accomplish your goals with ease." : "Become part of our productivity community. Sign up for task management tips, efficient tools, and seamless collaboration!"}
        </p>
        <button className="mt-4 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-purple-800 transition-all duration-300 ease-in-out z-10" onClick={handleToggleForm}>
          {isSignUp ? "SIGN IN" : "SIGN UP"}
        </button>
      </div>
    </div>
  );
};

// Your other components remain the same.


const SignupForm = ({ handleSubmit, handleGoogleSignUp }) => {
  return (
    <form className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up</h2>

      <div className="space-y-4">
        <InputField name="username" type="text" placeholder="Username" />
        <InputField name="email" type="email" placeholder="Email" />
        <InputField name="password" type="password" placeholder="Password" />
        <InputField name="phoneNumber" type="text" placeholder="Phone Number" />

        {/* 🔹 قائمة اختيار الدور */}
        <select name="role" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="team member">Team Member</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <button className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800  transition-all duration-200">Sign up</button>

      <button type="button" className="w-full mt-4 px-6 py-2 border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-300" onClick={handleGoogleSignUp}>
        Or, Sign up with <FaGoogle className="inline ml-2" />
      </button>
    </form>
  );
};


const SigninForm = ({ handleSubmit, handleGoogleSignIn }) => {
  return (
    <form className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign in</h2>

      <div className="space-y-4">
        <InputField name="email" type="email" placeholder="Email" />
        <InputField name="password" type="password" placeholder="Password" />
      </div>

      <button className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 transition-all duration-200">Login</button>

      <button type="button" className="w-full mt-4 px-6 py-2 border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-300" onClick={handleGoogleSignIn}>
        Or, Login with <FaGoogle className="inline ml-2" />
      </button>
    </form>
  );
};

const InputField = ({ name, type, placeholder }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
);

export default Register;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Check,
  Eye,
  EyeOff,
  Calendar,
  Shield,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Role" },
  { id: 3, label: "Security" },
  { id: 4, label: "Verify" },
];

const FloatingInput = ({
  icon: Icon,
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isDate = type === "date";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const hasValue = value && value.length > 0;
  const isFloating = focused || hasValue || isDate;

  return (
    <div className="relative group pt-2">
      <div
        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300
        ${
          error
            ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-500/5"
            : focused
              ? "border-amber-500 dark:border-amber-400 bg-amber-50/30 dark:bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
              : "border-gray-300 dark:border-white/15 bg-white/50 dark:bg-white/5 hover:border-gray-400 dark:hover:border-white/25"
        }`}
      >
        <Icon
          className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
            focused
              ? "text-amber-500 dark:text-amber-400"
              : "text-gray-400 dark:text-gray-500"
          }`}
        />
        <div className="relative flex-1 min-h-[24px] flex items-center">
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full bg-transparent text-gray-800 dark:text-white text-sm outline-none
              ${!isDate && !hasValue && !focused ? "text-transparent" : ""}
              ${isDate && !hasValue ? "[color-scheme:light] dark:[color-scheme:dark] text-gray-400 dark:text-gray-500" : ""}`}
            placeholder=""
            autoComplete="new-password"
          />
          {/* Floating label — positioned on border */}
          <label
            className={`absolute left-0 pointer-events-none transition-all duration-200 ease-out whitespace-nowrap
            ${
              isFloating
                ? "-top-[22px] text-xs font-semibold px-1 rounded bg-white dark:bg-gray-950 " +
                  (error
                    ? "text-red-500"
                    : "text-amber-600 dark:text-amber-400")
                : "top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500"
            }`}
          >
            {label}
          </label>
        </div>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const OTPInput = ({ value, onChange, length = 6 }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value;
    if (val.length > 1) return;
    const newOtp = value.split("");
    newOtp[index] = val;
    onChange(newOtp.join(""));
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    onChange(pastedData);
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <motion.input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className={`w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-bold rounded-xl border-2 
            bg-white/60 dark:bg-white/5 text-gray-800 dark:text-white outline-none
            transition-all duration-300
            ${
              value[index]
                ? "border-amber-500 dark:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                : "border-gray-300 dark:border-white/15 hover:border-gray-400 dark:hover:border-white/25"
            }
            focus:border-amber-500 dark:focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.2)]`}
        />
      ))}
    </div>
  );
};

const RegistrationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    mobile: "",
    password: "",
    role: "", // "student" or "industry"
    collegeName: "",
    universityName: "",
    designation: "",
    organizationName: "",
    termsAccepted: false,
    otp: "",
  });
  const [errors, setErrors] = useState({});

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setDirection(1);
        setOtpSent(false);
        setOtpTimer(0);
        setFormData({
          fullName: "",
          dob: "",
          email: "",
          mobile: "",
          password: "",
          role: "",
          collegeName: "",
          universityName: "",
          designation: "",
          organizationName: "",
          termsAccepted: false,
          otp: "",
        });
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputChange = (e) => handleChange(e);

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.mobile.trim())
        newErrors.mobile = "Mobile number is required";
      else if (!/^\d{10}$/.test(formData.mobile))
        newErrors.mobile = "Enter valid 10-digit number";
    }
    if (currentStep === 2) {
      if (!formData.role) newErrors.role = "Please select your role";
      if (formData.role === "student") {
        if (!formData.collegeName.trim())
          newErrors.collegeName = "College name is required";
        if (!formData.universityName.trim())
          newErrors.universityName = "University name is required";
      }
      if (formData.role === "industry") {
        if (!formData.designation.trim())
          newErrors.designation = "Designation is required";
        if (!formData.organizationName.trim())
          newErrors.organizationName = "Organization name is required";
      }
    }
    if (currentStep === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8)
        newErrors.password = "Minimum 8 characters";
      if (!formData.termsAccepted)
        newErrors.termsAccepted = "You must accept the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const sendOTP = () => {
    setOtpSent(true);
    setOtpTimer(30);
  };

  const handleSubmit = () => {
    if (formData.otp.length === 6) {
      onClose();
      navigate("/education");
    }
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const passwordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(formData.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "",
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-400",
    "bg-green-500",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Decorative floating orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, #f59e0b, transparent 70%)",
              }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-15"
              style={{
                background: "radial-gradient(circle, #ef4444, transparent 70%)",
              }}
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
          </div>

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl
              bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl
              border border-gray-200/80 dark:border-white/10
              shadow-2xl shadow-black/20 dark:shadow-black/50"
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 py-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-t-2xl" />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full
                bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400
                hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-700 dark:hover:text-white
                transition-all duration-200"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header */}
            <div className="px-6 sm:px-8 pt-7 pb-1">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-1"
              >
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-lg shadow-amber-500/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    3D Education
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Join the future of construction learning
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Step Indicator */}
            <div className="px-6 sm:px-8 py-3">
              <div className="flex items-center justify-between">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          step > s.id
                            ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                            : step === s.id
                              ? "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 ring-4 ring-amber-400/20 dark:ring-amber-400/10"
                              : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500"
                        }`}
                        animate={step === s.id ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                      </motion.div>
                      <span
                        className={`text-[10px] mt-1 font-medium ${
                          step >= s.id
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-8 sm:w-16 h-0.5 mx-1 -mt-3 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                          initial={{ width: "0%" }}
                          animate={{ width: step > s.id ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="px-6 sm:px-8 pb-4 min-h-[300px] overflow-y-auto flex-1">
              <AnimatePresence mode="wait" custom={direction}>
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-3"
                  >
                    <FloatingInput
                      icon={User}
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                    />
                    <FloatingInput
                      icon={Calendar}
                      label="Date of Birth"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      error={errors.dob}
                    />
                    <FloatingInput
                      icon={Mail}
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <FloatingInput
                      icon={Phone}
                      label="Mobile Number"
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      error={errors.mobile}
                    />
                  </motion.div>
                )}

                {/* Step 2: Role Selection */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-3"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Select your role
                    </p>
                    {errors.role && (
                      <p className="text-red-500 text-xs">{errors.role}</p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Student Card */}
                      <motion.button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            role: "student",
                            designation: "",
                            organizationName: "",
                          }));
                          setErrors((prev) => ({ ...prev, role: "" }));
                        }}
                        className={`relative p-5 rounded-xl border-2 text-left transition-all duration-300 group overflow-hidden
                          ${
                            formData.role === "student"
                              ? "border-amber-500 dark:border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 shadow-lg shadow-amber-500/10"
                              : "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {formData.role === "student" && (
                          <motion.div
                            layoutId="roleCheck"
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                        <GraduationCap
                          className={`w-8 h-8 mb-2 transition-colors ${formData.role === "student" ? "text-amber-500" : "text-gray-400 dark:text-gray-500"}`}
                        />
                        <p
                          className={`font-semibold text-sm ${formData.role === "student" ? "text-gray-800 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          Student
                        </p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                          Academic learner
                        </p>
                      </motion.button>

                      {/* Industry Card */}
                      <motion.button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            role: "industry",
                            collegeName: "",
                            universityName: "",
                          }));
                          setErrors((prev) => ({ ...prev, role: "" }));
                        }}
                        className={`relative p-5 rounded-xl border-2 text-left transition-all duration-300 group overflow-hidden
                          ${
                            formData.role === "industry"
                              ? "border-amber-500 dark:border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 shadow-lg shadow-amber-500/10"
                              : "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {formData.role === "industry" && (
                          <motion.div
                            layoutId="roleCheck"
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                        <Briefcase
                          className={`w-8 h-8 mb-2 transition-colors ${formData.role === "industry" ? "text-amber-500" : "text-gray-400 dark:text-gray-500"}`}
                        />
                        <p
                          className={`font-semibold text-sm ${formData.role === "industry" ? "text-gray-800 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          Industry
                        </p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                          Working professional
                        </p>
                      </motion.button>
                    </div>

                    {/* Conditional Fields */}
                    <AnimatePresence mode="wait">
                      {formData.role === "student" && (
                        <motion.div
                          key="student-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <FloatingInput
                            icon={Building2}
                            label="College Name"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleInputChange}
                            error={errors.collegeName}
                          />
                          <FloatingInput
                            icon={GraduationCap}
                            label="University Name"
                            name="universityName"
                            value={formData.universityName}
                            onChange={handleInputChange}
                            error={errors.universityName}
                          />
                        </motion.div>
                      )}
                      {formData.role === "industry" && (
                        <motion.div
                          key="industry-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <FloatingInput
                            icon={Briefcase}
                            label="Designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            error={errors.designation}
                          />
                          <FloatingInput
                            icon={Building2}
                            label="Organization Name"
                            name="organizationName"
                            value={formData.organizationName}
                            onChange={handleInputChange}
                            error={errors.organizationName}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Step 3: Password & Terms */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-3"
                  >
                    <FloatingInput
                      icon={Lock}
                      label="Create Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      error={errors.password}
                    />

                    {/* Password strength meter */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                strength >= i
                                  ? strengthColors[strength]
                                  : "bg-gray-200 dark:bg-white/10"
                              }`}
                            />
                          ))}
                        </div>
                        <p
                          className={`text-xs font-medium ${
                            strength <= 1
                              ? "text-red-500"
                              : strength === 2
                                ? "text-orange-500"
                                : strength === 3
                                  ? "text-amber-500"
                                  : "text-green-500"
                          }`}
                        >
                          {strengthLabels[strength]}
                        </p>
                      </motion.div>
                    )}

                    {/* Password hints */}
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
                        Password requirements:
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          {
                            text: "8+ characters",
                            met: formData.password.length >= 8,
                          },
                          {
                            text: "Uppercase letter",
                            met: /[A-Z]/.test(formData.password),
                          },
                          {
                            text: "Number",
                            met: /[0-9]/.test(formData.password),
                          },
                          {
                            text: "Special character",
                            met: /[^A-Za-z0-9]/.test(formData.password),
                          },
                        ].map((req) => (
                          <div
                            key={req.text}
                            className="flex items-center gap-1.5"
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                req.met
                                  ? "bg-green-500"
                                  : "bg-gray-300 dark:bg-white/15"
                              }`}
                            >
                              {req.met && (
                                <Check className="w-2.5 h-2.5 text-white" />
                              )}
                            </div>
                            <span
                              className={`text-[11px] ${req.met ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}
                            >
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                            formData.termsAccepted
                              ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-500"
                              : "border-gray-300 dark:border-white/20 group-hover:border-gray-400 dark:group-hover:border-white/30"
                          }`}
                        >
                          {formData.termsAccepted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                        I've read and agree to the{" "}
                        <span className="text-amber-600 dark:text-amber-400 font-medium hover:underline cursor-pointer">
                          Terms &amp; Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-amber-600 dark:text-amber-400 font-medium hover:underline cursor-pointer">
                          Privacy Policy
                        </span>
                      </span>
                    </label>
                    {errors.termsAccepted && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-xs ml-8 -mt-2"
                      >
                        {errors.termsAccepted}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Step 4: OTP Verification */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-3">
                      <motion.div
                        className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-xl shadow-amber-500/20"
                        animate={{ rotateY: [0, 360] }}
                        transition={{ duration: 2, delay: 0.3 }}
                      >
                        <Shield className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Verify Your Identity
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {otpSent ? (
                          <>
                            We've sent a 6-digit code to{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                              {formData.email}
                            </span>
                          </>
                        ) : (
                          "Click below to receive a verification code"
                        )}
                      </p>
                    </div>

                    {!otpSent ? (
                      <motion.button
                        type="button"
                        onClick={sendOTP}
                        className="w-full py-3.5 rounded-xl font-semibold text-white text-sm
                          bg-gradient-to-r from-amber-500 via-orange-500 to-red-500
                          hover:from-amber-600 hover:via-orange-600 hover:to-red-600
                          shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
                          transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Verification Code
                      </motion.button>
                    ) : (
                      <>
                        <OTPInput
                          value={formData.otp}
                          onChange={(val) =>
                            setFormData((prev) => ({ ...prev, otp: val }))
                          }
                        />
                        <div className="text-center">
                          {otpTimer > 0 ? (
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              Resend code in{" "}
                              <span className="font-bold text-amber-500">
                                {otpTimer}s
                              </span>
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={sendOTP}
                              className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                            >
                              Didn't receive it? Resend Code
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            <div className="px-6 sm:px-8 pb-6 pt-2">
              <div className="flex items-center justify-between gap-4">
                {step > 1 ? (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium
                      text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10
                      hover:bg-gray-200 dark:hover:bg-white/15 transition-all duration-200"
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </motion.button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white
                      bg-gradient-to-r from-amber-500 via-orange-500 to-red-500
                      hover:from-amber-600 hover:via-orange-600 hover:to-red-600
                      shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
                      transition-all duration-300"
                    whileHover={{ x: 3, scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ) : otpSent ? (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={formData.otp.length < 6}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300
                      ${
                        formData.otp.length === 6
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                          : "bg-gray-300 dark:bg-white/10 cursor-not-allowed"
                      }`}
                    whileHover={
                      formData.otp.length === 6 ? { scale: 1.02 } : {}
                    }
                    whileTap={formData.otp.length === 6 ? { scale: 0.95 } : {}}
                  >
                    <Check className="w-4 h-4" />
                    Verify & Register
                  </motion.button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;

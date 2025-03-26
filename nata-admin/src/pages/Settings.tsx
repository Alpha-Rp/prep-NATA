import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Shield, Database, Globe, Clock, Save } from "lucide-react";

interface Setting {
  id: string;
  name: string;
  description: string;
  value: boolean;
  category: "notifications" | "security" | "system" | "general";
}

const mockSettings: Setting[] = [
  {
    id: "S1",
    name: "Email Notifications",
    description: "Receive email notifications for important updates",
    value: true,
    category: "notifications",
  },
  {
    id: "S2",
    name: "Two-Factor Authentication",
    description: "Enable two-factor authentication for added security",
    value: false,
    category: "security",
  },
  {
    id: "S3",
    name: "Automatic Backups",
    description: "Enable automatic database backups",
    value: true,
    category: "system",
  },
  {
    id: "S4",
    name: "System Maintenance Mode",
    description: "Put the system in maintenance mode",
    value: false,
    category: "system",
  },
  {
    id: "S5",
    name: "Browser Notifications",
    description: "Show browser notifications for updates",
    value: true,
    category: "notifications",
  },
  {
    id: "S6",
    name: "API Access",
    description: "Allow external API access",
    value: false,
    category: "security",
  },
];

const categories = [
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "security", name: "Security", icon: Shield },
  { id: "system", name: "System", icon: Database },
  { id: "general", name: "General", icon: Globe },
];

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState("notifications");
  const [settings, setSettings] = useState(mockSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (settingId: string) => {
    const updatedSettings = settings.map(setting =>
      setting.id === settingId ? { ...setting, value: !setting.value } : setting
    );
    setSettings(updatedSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setHasChanges(false);
  };

  const filteredSettings = settings.filter(
    setting => setting.category === activeCategory
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-deepNavy">Settings</h1>
        <p className="mt-2 text-charcoal">Manage your application settings</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <nav className="space-y-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-terracotta/10 text-terracotta"
                    : "text-charcoal hover:bg-gray-50"
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="p-6">
              <div className="space-y-6">
                {filteredSettings.map(setting => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-deepNavy">
                        {setting.name}
                      </h3>
                      <p className="mt-1 text-sm text-charcoal">
                        {setting.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        type="button"
                        onClick={() => handleToggle(setting.id)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          setting.value ? "bg-sage" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            setting.value ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex justify-end"
            >
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import { useTimeZone } from "./TimeContext";
import Styles from "./SettingsAccount.module.css";
import {
  IoTimeOutline,
  IoCalendarOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import "./TimeZones.css";
import { CallAPI } from "../../../middleware/api";
import endpoints from "../../../middleware/endpoint";
import { getID, setID } from "../../../siteConfig";
import { decrypt } from "../../../middleware/auth";

const countries = [
  { name: "United States (Eastern)", timeZone: "America/New_York" },
  { name: "United States (Central)", timeZone: "America/Chicago" },
  { name: "United States (Mountain)", timeZone: "America/Denver" },
  { name: "United States (Pacific)", timeZone: "America/Los_Angeles" },
  { name: "Afghanistan", timeZone: "Asia/Kabul" },
  { name: "India", timeZone: "Asia/Kolkata" },
  { name: "Albania", timeZone: "Europe/Tirane" },
  { name: "Algeria", timeZone: "Africa/Algiers" },
  { name: "Andorra", timeZone: "Europe/Andorra" },
  { name: "Angola", timeZone: "Africa/Luanda" },
  { name: "Antigua and Barbuda", timeZone: "America/Antigua" },
  {
    name: "Argentina (Buenos Aires)",
    timeZone: "America/Argentina/Buenos_Aires",
  },
  { name: "Armenia", timeZone: "Asia/Yerevan" },
  { name: "Australia (Sydney)", timeZone: "Australia/Sydney" },
  { name: "Australia (Perth)", timeZone: "Australia/Perth" },
  { name: "Austria", timeZone: "Europe/Vienna" },
  { name: "Azerbaijan", timeZone: "Asia/Baku" },
  { name: "Bahamas", timeZone: "America/Nassau" },
  { name: "Bahrain", timeZone: "Asia/Bahrain" },
  { name: "Bangladesh", timeZone: "Asia/Dhaka" },
  { name: "Barbados", timeZone: "America/Barbados" },
  { name: "Belarus", timeZone: "Europe/Minsk" },
  { name: "Belgium", timeZone: "Europe/Brussels" },
  { name: "Belize", timeZone: "America/Belize" },
  { name: "Benin", timeZone: "Africa/Porto-Novo" },
  { name: "Bhutan", timeZone: "Asia/Thimphu" },
  { name: "Bolivia", timeZone: "America/La_Paz" },
  { name: "Bosnia and Herzegovina", timeZone: "Europe/Sarajevo" },
  { name: "Botswana", timeZone: "Africa/Gaborone" },
  { name: "Brazil (Brasília)", timeZone: "America/Sao_Paulo" },
  { name: "Brazil (Manaus)", timeZone: "America/Manaus" },
  { name: "Brunei", timeZone: "Asia/Brunei" },
  { name: "Bulgaria", timeZone: "Europe/Sofia" },
  { name: "Burkina Faso", timeZone: "Africa/Ouagadougou" },
  { name: "Burundi", timeZone: "Africa/Bujumbura" },
  { name: "Cabo Verde", timeZone: "Atlantic/Cape_Verde" },
  { name: "Cambodia", timeZone: "Asia/Phnom_Penh" },
  { name: "Cameroon", timeZone: "Africa/Douala" },
  { name: "Canada (Toronto)", timeZone: "America/Toronto" },
  { name: "Canada (Vancouver)", timeZone: "America/Vancouver" },
  { name: "Central African Republic", timeZone: "Africa/Bangui" },
  { name: "Chad", timeZone: "Africa/Ndjamena" },
  { name: "Chile (Santiago)", timeZone: "America/Santiago" },
  { name: "China", timeZone: "Asia/Shanghai" },
  { name: "Colombia", timeZone: "America/Bogota" },
  { name: "Comoros", timeZone: "Indian/Comoro" },
  { name: "Congo (Brazzaville)", timeZone: "Africa/Brazzaville" },
  { name: "Congo (Kinshasa)", timeZone: "Africa/Kinshasa" },
  { name: "Costa Rica", timeZone: "America/Costa_Rica" },
  { name: "Croatia", timeZone: "Europe/Zagreb" },
  { name: "Cuba", timeZone: "America/Havana" },
  { name: "Cyprus", timeZone: "Asia/Nicosia" },
  { name: "Czech Republic", timeZone: "Europe/Prague" },
  { name: "Denmark", timeZone: "Europe/Copenhagen" },
  { name: "Djibouti", timeZone: "Africa/Djibouti" },
  { name: "Dominica", timeZone: "America/Dominica" },
  { name: "Dominican Republic", timeZone: "America/Santo_Domingo" },
  { name: "Ecuador (Quito)", timeZone: "America/Guayaquil" },
  { name: "Ecuador (Galápagos)", timeZone: "Pacific/Galapagos" },
  { name: "Egypt", timeZone: "Africa/Cairo" },
  { name: "El Salvador", timeZone: "America/El_Salvador" },
  { name: "Equatorial Guinea", timeZone: "Africa/Malabo" },
  { name: "Eritrea", timeZone: "Africa/Asmara" },
  { name: "Estonia", timeZone: "Europe/Tallinn" },
  { name: "Eswatini", timeZone: "Africa/Mbabane" },
  { name: "Ethiopia", timeZone: "Africa/Addis_Ababa" },
  { name: "Fiji", timeZone: "Pacific/Fiji" },
  { name: "Finland", timeZone: "Europe/Helsinki" },
  { name: "France (Paris)", timeZone: "Europe/Paris" },
  { name: "Gabon", timeZone: "Africa/Libreville" },
  { name: "Gambia", timeZone: "Africa/Banjul" },
  { name: "Georgia", timeZone: "Asia/Tbilisi" },
  { name: "Germany (Berlin)", timeZone: "Europe/Berlin" },
  { name: "Ghana", timeZone: "Africa/Accra" },
  { name: "Greece", timeZone: "Europe/Athens" },
  { name: "Grenada", timeZone: "America/Grenada" },
  { name: "Guatemala", timeZone: "America/Guatemala" },
  { name: "Guinea", timeZone: "Africa/Conakry" },
  { name: "Guinea-Bissau", timeZone: "Africa/Bissau" },
  { name: "Guyana", timeZone: "America/Guyana" },
  { name: "Haiti", timeZone: "America/Port-au-Prince" },
  { name: "Honduras", timeZone: "America/Tegucigalpa" },
  { name: "Hong Kong", timeZone: "Asia/Hong_Kong" },
  { name: "Hungary", timeZone: "Europe/Budapest" },
  { name: "Iceland", timeZone: "Atlantic/Reykjavik" },
  { name: "India", timeZone: "Asia/Kolkata" },
  { name: "Indonesia (Jakarta)", timeZone: "Asia/Jakarta" },
  { name: "Iran", timeZone: "Asia/Tehran" },
  { name: "Iraq", timeZone: "Asia/Baghdad" },
  { name: "Ireland", timeZone: "Europe/Dublin" },
  { name: "Israel", timeZone: "Asia/Jerusalem" },
  { name: "Italy", timeZone: "Europe/Rome" },
  { name: "Jamaica", timeZone: "America/Jamaica" },
  { name: "Japan", timeZone: "Asia/Tokyo" },
  { name: "Jordan", timeZone: "Asia/Amman" },
  { name: "Kazakhstan (Almaty)", timeZone: "Asia/Almaty" },
  { name: "Kenya", timeZone: "Africa/Nairobi" },
  { name: "Kiribati (Tarawa)", timeZone: "Pacific/Tarawa" },
  { name: "Kuwait", timeZone: "Asia/Kuwait" },
  { name: "Kyrgyzstan", timeZone: "Asia/Bishkek" },
  { name: "Laos", timeZone: "Asia/Vientiane" },
  { name: "Latvia", timeZone: "Europe/Riga" },
  { name: "Lebanon", timeZone: "Asia/Beirut" },
  { name: "Lesotho", timeZone: "Africa/Maseru" },
  { name: "Liberia", timeZone: "Africa/Monrovia" },
  { name: "Libya", timeZone: "Africa/Tripoli" },
  { name: "Lithuania", timeZone: "Europe/Vilnius" },
  { name: "Luxembourg", timeZone: "Europe/Luxembourg" },
  { name: "Madagascar", timeZone: "Indian/Antananarivo" },
  { name: "Malawi", timeZone: "Africa/Blantyre" },
  { name: "Malaysia", timeZone: "Asia/Kuala_Lumpur" },
  { name: "Maldives", timeZone: "Indian/Maldives" },
  { name: "Mali", timeZone: "Africa/Bamako" },
  { name: "Malta", timeZone: "Europe/Malta" },
  { name: "Mexico (Mexico City)", timeZone: "America/Mexico_City" },
  { name: "Mongolia (Ulaanbaatar)", timeZone: "Asia/Ulaanbaatar" },
  { name: "Morocco", timeZone: "Africa/Casablanca" },
  { name: "Mozambique", timeZone: "Africa/Maputo" },
  { name: "Myanmar", timeZone: "Asia/Yangon" },
  { name: "Namibia", timeZone: "Africa/Windhoek" },
  { name: "Nepal", timeZone: "Asia/Kathmandu" },
  { name: "Netherlands", timeZone: "Europe/Amsterdam" },
  { name: "New Zealand", timeZone: "Pacific/Auckland" },
  { name: "Nigeria", timeZone: "Africa/Lagos" },
  { name: "Norway", timeZone: "Europe/Oslo" },
  { name: "Oman", timeZone: "Asia/Muscat" },
  { name: "Pakistan", timeZone: "Asia/Karachi" },
  { name: "Panama", timeZone: "America/Panama" },
  { name: "Peru", timeZone: "America/Lima" },
  { name: "Philippines", timeZone: "Asia/Manila" },
  { name: "Poland", timeZone: "Europe/Warsaw" },
  { name: "Portugal", timeZone: "Europe/Lisbon" },
  { name: "Qatar", timeZone: "Asia/Qatar" },
  { name: "Romania", timeZone: "Europe/Bucharest" },
  { name: "Russia (Moscow)", timeZone: "Europe/Moscow" },
  { name: "Rwanda", timeZone: "Africa/Kigali" },
  { name: "Saudi Arabia", timeZone: "Asia/Riyadh" },
  { name: "Serbia", timeZone: "Europe/Belgrade" },
  { name: "Singapore", timeZone: "Asia/Singapore" },
  { name: "Slovakia", timeZone: "Europe/Bratislava" },
  { name: "Slovenia", timeZone: "Europe/Ljubljana" },
  { name: "South Africa", timeZone: "Africa/Johannesburg" },
  { name: "South Korea", timeZone: "Asia/Seoul" },
  { name: "Spain", timeZone: "Europe/Madrid" },
  { name: "Sri Lanka", timeZone: "Asia/Colombo" },
  { name: "Sudan", timeZone: "Africa/Khartoum" },
  { name: "Sweden", timeZone: "Europe/Stockholm" },
  { name: "Switzerland", timeZone: "Europe/Zurich" },
  { name: "Syria", timeZone: "Asia/Damascus" },
  { name: "Taiwan", timeZone: "Asia/Taipei" },
  { name: "Tanzania", timeZone: "Africa/Dar_es_Salaam" },
  { name: "Thailand", timeZone: "Asia/Bangkok" },
  { name: "Turkey", timeZone: "Europe/Istanbul" },
  { name: "Uganda", timeZone: "Africa/Kampala" },
  { name: "Ukraine", timeZone: "Europe/Kyiv" },
  { name: "United Arab Emirates", timeZone: "Asia/Dubai" },
  { name: "United Kingdom", timeZone: "Europe/London" },

  { name: "Uruguay", timeZone: "America/Montevideo" },
  { name: "Uzbekistan", timeZone: "Asia/Tashkent" },
  { name: "Venezuela", timeZone: "America/Caracas" },
  { name: "Vietnam", timeZone: "Asia/Ho_Chi_Minh" },
  { name: "Yemen", timeZone: "Asia/Aden" },
  { name: "Zambia", timeZone: "Africa/Lusaka" },
  { name: "Zimbabwe", timeZone: "Africa/Harare" },
];

const timeFormats = [
  { label: "hh:mm A", format: "hh:mm A" },
  { label: "HH:MM", format: "HH:mm" },
];

const dateFormats = [
  { label: "DD-MM-YYYY", format: "DD-MM-YYYY" },
  { label: "DD/MM/YYYY", format: "DD/MM/YYYY" },
  { label: "MM/DD/YYYY", format: "MM/DD/YYYY" },
  { label: "MM-DD-YYYY", format: "MM-DD-YYYY" },
  { label: "DD MMM, YYYY", format: "DD MMM, YYYY" },
];

const TimeZones = () => {
  const userTimeZone = moment.tz.guess();
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    getID("storedTimeZone") || userTimeZone
  );
  const [selectedTimeFormat, setSelectedTimeFormat] = useState(
    getID("storedTimeFormat") || timeFormats[0].format
  );
  const [selectedDateFormat, setSelectedDateFormat] = useState(
    getID("storedDateFormat") || dateFormats[0].format
  );
  const [time, setTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const { setSelectedTimeEntry } = useTimeZone();
  const [userDetails, setUserDetails] = useState({});
  const userId = getID("userId");

  const dropdownRef = useRef(null);

  const updateTime = () => {
    const now = moment().tz(selectedTimeZone);
    const formattedDate = now.format(selectedDateFormat);
    const formattedTime = now.format(selectedTimeFormat);
    const combinedDateTime = `${formattedDate} ${formattedTime}`;

    setTime(combinedDateTime);
    // setSelectedTimeEntry(combinedDateTime);

    // localStorage.setItem("storedTimeFormat", selectedTimeFormat);
    // localStorage.setItem("storedDateFormat", selectedDateFormat);
    // localStorage.setItem("storedTimeZone", selectedTimeZone);
  };

  useEffect(() => {
    updateTime();
  }, [selectedDateFormat, selectedTimeFormat, selectedTimeZone]);

  const saveSettings = async (updatedSettings) => {
    const payload = {
      uuid: userDetails?.uuid,
      ...updatedSettings,
    };

    try {
      const response = await CallAPI(endpoints.updateBussUserProfile, payload);
      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleCountryChange = (timeZone) => {
    setSelectedTimeZone(timeZone);
    setID("storedTimeZone", timeZone);
    // updateTime();
    saveSettings({ time_zone: timeZone });
    setIsDropdownOpen(false);
  };

  const handleTimeFormatChange = (e) => {
    const format = e.target.value;
    setSelectedTimeFormat(format);
    setID("storedTimeFormat", format);
    // updateTime();
    saveSettings({ time_format: format });
  };

  const handleDateFormatChange = (e) => {
    const format = e.target.value;
    setSelectedDateFormat(format);
    setID("storedDateFormat", format);
    // updateTime();
    saveSettings({ date_format: format });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (getID("userData")) {
      const userDetails = JSON.parse(decrypt(getID("userData")));
      setUserDetails(userDetails);
    }
  }, []);

  useEffect(() => {
    updateTime();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={Styles?.Container}>
      <div className={Styles?.User}>
        <div className={Styles?.UserLeft}>
          <IoGlobeOutline style={{ fontSize: "20px", marginTop: "3px" }} />
          Time zone
        </div>
        <div
          ref={dropdownRef}
          style={{
            position: "relative",
            display: "inline-block",
            marginLeft: "100px",
          }}
        >
          <div
            onClick={handleToggleDropdown}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "5px",
              fontSize: "14px",
              width: '150px'
            }}
          >
            {selectedTimeZone} &#9662;
          </div>
          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1,
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                maxHeight: "200px",
                overflowY: "auto",
                fontSize: "14px",
              }}
            >
              <input
                type="text"
                className=""
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search country..."
                style={{
                  width: "100%",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              />
              {filteredCountries.map((country) => (
                <div
                  key={country.name}
                  onClick={() => handleCountryChange(country.timeZone)}
                  style={{ padding: "5px", cursor: "pointer" }}
                >
                  {country?.timeZone}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={Styles?.User} style={{ marginTop: "20px" }}>
        <div className={Styles?.UserLeft}>
          <IoTimeOutline style={{ fontSize: "20px", marginTop: "3px" }} />
          Time format
        </div>
        <select
          value={selectedTimeFormat}
          onChange={handleTimeFormatChange}
          style={{
            marginLeft: "100px",
            padding: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            width: '150px'
          }}
        >
          {timeFormats.map((format) => (
            <option key={format.format} value={format.format}>
              {format.label}
            </option>
          ))}
        </select>
      </div>

      <div className={Styles?.User} style={{ marginTop: "20px" }}>
        <div className={Styles?.UserLeft}>
          <IoCalendarOutline style={{ fontSize: "20px", marginTop: "3px" }} />
          Date format
        </div>
        <select
          value={selectedDateFormat}
          onChange={handleDateFormatChange}
          style={{
            marginLeft: "100px",
            padding: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            width: '150px'
          }}
        >
          {dateFormats.map((format) => (
            <option key={format.format} value={format.format}>
              {format.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeZones;

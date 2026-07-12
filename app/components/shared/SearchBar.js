"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";
import { Search, MapPin, Users, Navigation } from "lucide-react";
import Button from "./Button";

export default function SearchBar({ compact = false }) {
  const router = useRouter();
  const [area, setArea] = useState("");
  const [gender, setGender] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    let query = "/hostels";
    const params = [];
    if (area) params.push(`area=${encodeURIComponent(area)}`);
    if (gender) params.push(`gender=${encodeURIComponent(gender)}`);
    if (params.length > 0) {
      query += `?${params.join("&")}`;
    }
    router.push(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`${styles.searchBar} ${compact ? styles.compact : ""} glass`}
    >
      <div className={styles.searchField}>
        <MapPin className={styles.icon} size={20} />
        <div className={styles.inputContainer}>
          <label>Select Locality</label>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">All Areas (Greater Noida)</option>
            <option value="Knowledge Park 3">Knowledge Park 3</option>
            <option value="Knowledge Park 2">Knowledge Park 2</option>
          </select>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.searchField}>
        <Users className={styles.icon} size={20} />
        <div className={styles.inputContainer}>
          <label>Occupancy For</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Boys & Girls</option>
            <option value="male">Boys Hostel</option>
            <option value="female">Girls Hostel</option>
          </select>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button type="submit" variant="primary" size="lg" className={styles.searchButton}>
          <Search size={20} />
          {!compact && <span>Find Rooms</span>}
        </Button>
      </div>
    </form>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { ProtectedRoutesContext } from "../../../components/layout/protectedRoutes";
import backendClient from "../../../lib/backend/client";

function Dashboard() {
  const router = useRouter();
  const user = useContext(ProtectedRoutesContext);
  if (!user) return null;

  return (
    <div className="px-10">
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;

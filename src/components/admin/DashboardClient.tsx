"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  RefreshCw,
  Trash2,
  Filter,
  Calendar,
  FileText,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  Loader2,
} from "lucide-react";

interface FormResponse {
  id: string;
  formType: string;
  timestamp: string;
  data: Record<string, unknown>;
  metadata: {
    userAgent?: string;
    referrer?: string;
    ip?: string;
  };
}

export default function AdminDashboardClient() {
  const router = useRouter();
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [formTypes, setFormTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFormType, setSelectedFormType] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const fetchResponses = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedFormType !== "all") {
        params.set("formType", selectedFormType);
      }

      const response = await fetch(`/api/admin/responses?${params}`);

      if (response.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await response.json();
      if (data.success) {
        setResponses(data.responses);
        setFormTypes(data.formTypes);
        setTotalCount(data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router, selectedFormType]);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this response?")) return;

    try {
      const response = await fetch(`/api/admin/responses?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setResponses((prev) => prev.filter((r) => r.id !== id));
        setTotalCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  const exportToCSV = () => {
    if (responses.length === 0) return;

    const headers = [
      "ID",
      "Form Type",
      "Timestamp",
      "Email",
      "Phone",
      "Company",
      "Message",
    ];
    const rows = responses.map((r) => [
      r.id,
      r.formType,
      new Date(r.timestamp).toLocaleString(),
      (r.data.workEmail || r.data.email || "") as string,
      (r.data.phoneNumber || r.data.phone || "") as string,
      (r.data.companyName || r.data.businessName || "") as string,
      (r.data.message || r.data.productDetails || "") as string,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `form-responses-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredResponses = responses.filter((r) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      r.formType.toLowerCase().includes(searchLower) ||
      JSON.stringify(r.data).toLowerCase().includes(searchLower)
    );
  });

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Form Responses</h1>
            <p className="text-sm text-gray-500">
              {totalCount} total submissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchResponses}
              disabled={isLoading}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw
                className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={exportToCSV}
              disabled={responses.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search responses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Form Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedFormType}
              onChange={(e) => setSelectedFormType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="all">All Forms</option>
              {formTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : filteredResponses.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No form responses yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResponses.map((response) => (
              <div
                key={response.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Response Header */}
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setExpandedId(
                      expandedId === response.id ? null : response.id
                    )
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {response.formType}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {response.id.split("-")[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(response.timestamp).toLocaleString()}
                        </span>
                        {response.data.workEmail || response.data.email ? (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {
                              (response.data.workEmail ||
                                response.data.email) as string
                            }
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(response.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {expandedId === response.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === response.id && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Form Data */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Form Data
                        </h4>
                        <div className="bg-white rounded-lg p-4 space-y-2">
                          {Object.entries(response.data).map(([key, value]) => (
                            <div key={key} className="flex">
                              <span className="text-sm text-gray-500 w-40 flex-shrink-0">
                                {key}:
                              </span>
                              <span className="text-sm text-gray-900 break-all">
                                {formatValue(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-700 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Metadata
                        </h4>
                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <div className="flex">
                            <span className="text-sm text-gray-500 w-24">
                              IP:
                            </span>
                            <span className="text-sm text-gray-900">
                              {response.metadata.ip || "Unknown"}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="text-sm text-gray-500 w-24">
                              Referrer:
                            </span>
                            <span className="text-sm text-gray-900 break-all">
                              {response.metadata.referrer || "Direct"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">
                              User Agent:
                            </span>
                            <span className="text-xs text-gray-700 mt-1 break-all">
                              {response.metadata.userAgent || "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

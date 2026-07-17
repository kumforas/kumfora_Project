"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  LogOut,
  User,
  History,
  Check,
  ChevronDown,
  Trash2,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice, formatDate, cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface OrderRecord {
  id: string;
  order_id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: string;
  items: {
    product: { id: string; name: string; price: number; thumbnail: string };
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  created_at: string;
}

const accountTabs = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AccountPage() {
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    signOut,
    updatePassword,
    deleteAccount,
    getAccessToken,
  } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  // Settings state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/account");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata?.first_name || "");
      setLastName(user.user_metadata?.last_name || "");
      setPhone(user.user_metadata?.phone || "");
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setOrdersLoading(true);
    setOrdersError(null);
    const fetchOrders = async () => {
      try {
        const token = await getAccessToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/orders`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          },
        );
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        } else {
          setOrdersError(data.error || "Failed to load orders");
        }
      } catch {
        setOrdersError("Failed to load orders");
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user, getAccessToken]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError(null);
    setSettingsSuccess(false);
    if (newPassword.length < 6) {
      setSettingsError("Password must be at least 6 characters");
      return;
    }
    setSettingsLoading(true);
    const { error } = await updatePassword(newPassword);
    setSettingsLoading(false);
    if (error) {
      setSettingsError(error);
    } else {
      setSettingsSuccess(true);
      setNewPassword("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    setDeleteError(null);
    setDeleteLoading(true);
    const { error } = await deleteAccount();
    setDeleteLoading(false);
    if (error) {
      setDeleteError(error);
    } else {
      router.push("/");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "success" | "primary" | "neutral" | "danger"
    > = {
      delivered: "success",
      shipped: "primary",
      pending: "neutral",
      cancelled: "danger",
    };
    return variants[status] || "neutral";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <Check className="w-4 h-4" />;
      case "shipped":
        return <Package className="w-4 h-4" />;
      case "pending":
        return <History className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kumfora-cream/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-kumfora-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-kumfora-gray">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const displayName =
    [firstName, lastName].filter(Boolean).join(" ") ||
    user.email?.split("@")[0] ||
    "User";

  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <div className="container-main py-6 lg:py-12">
        {/* Mobile Tab Bar */}
        <div className="lg:hidden mb-6 flex gap-2 p-1 bg-kumfora-lightGray/50 rounded-xl">
          {accountTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-body font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white shadow-sm text-kumfora-terracotta"
                  : "text-kumfora-slate hover:bg-white/50",
              )}
            >
              <tab.icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - desktop only */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="card p-6 space-y-4 sticky top-24">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-kumfora-blush flex items-center justify-center">
                  <User className="w-8 h-8 text-kumfora-terracotta" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-heading-md font-display font-medium text-kumfora-charcoal truncate">
                    {displayName}
                  </h2>
                  <p className="text-body-sm text-kumfora-gray truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <nav
                className="space-y-1"
                role="navigation"
                aria-label="Account sections"
              >
                {accountTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-body font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-kumfora-terracotta text-white"
                        : "text-kumfora-slate hover:bg-kumfora-blush hover:text-kumfora-terracotta",
                    )}
                  >
                    <tab.icon className="w-5 h-5" aria-hidden="true" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-body font-medium text-kumfora-hotPink hover:bg-kumfora-rose/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Orders */}
            {activeTab === "orders" && (
              <section aria-labelledby="orders-heading">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    id="orders-heading"
                    className="text-display-sm font-display font-medium text-kumfora-charcoal"
                  >
                    My Orders
                  </h2>
                  <Link href="/shop" className="btn-secondary">
                    Continue Shopping
                  </Link>
                </div>

                {ordersLoading && (
                  <div className="text-center py-12">
                    <div className="w-10 h-10 border-4 border-kumfora-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-body text-kumfora-gray">
                      Loading orders...
                    </p>
                  </div>
                )}

                {ordersError && (
                  <div className="card p-6 text-center py-12">
                    <Package className="w-16 h-16 text-kumfora-lightGray mx-auto mb-4" />
                    <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">
                      Error loading orders
                    </h3>
                    <p className="text-body text-kumfora-gray">{ordersError}</p>
                  </div>
                )}

                {!ordersLoading && !ordersError && orders.length === 0 && (
                  <div className="card p-12 text-center">
                    <Package className="w-16 h-16 text-kumfora-lightGray mx-auto mb-4" />
                    <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">
                      No orders yet
                    </h3>
                    <p className="text-body text-kumfora-gray mb-6">
                      Start shopping to see your orders here.
                    </p>
                    <Link href="/shop">
                      <Button leftIcon={<Package className="w-4 h-4" />}>
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                )}

                {!ordersLoading && !ordersError && orders.length > 0 && (
                  <div className="space-y-4" role="list">
                    {orders.map((order) => (
                      <article
                        key={order.id}
                        className="card p-6"
                        role="listitem"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-heading-md font-display font-medium text-kumfora-charcoal">
                              {order.order_id}
                            </span>
                            <span className="badge bg-kumfora-lightGray text-kumfora-slate">
                              {formatDate(order.created_at)}
                            </span>
                            <span
                              className={cn(
                                "badge",
                                getStatusBadge(order.status),
                              )}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                          <span className="text-heading-md font-semibold text-kumfora-terracotta">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                        <div className="divider mb-4" />
                        <div className="flex flex-wrap items-center gap-3">
                          {order.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-body-sm text-kumfora-slate"
                            >
                              {item.product.name} × {item.quantity}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <section aria-labelledby="settings-heading">
                <h2
                  id="settings-heading"
                  className="text-display-sm font-display font-medium text-kumfora-charcoal mb-6"
                >
                  Account Settings
                </h2>
                <div className="space-y-6 max-w-xl">
                  <div className="card p-6">
                    <h3 className="text-heading-md font-medium text-kumfora-charcoal mb-4">
                      Profile Information
                    </h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                          label="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <Input
                        label="Email"
                        type="email"
                        value={user.email || ""}
                        disabled
                      />
                      <Input label="Phone" value={phone} disabled />
                    </div>
                    <p className="text-body-sm text-kumfora-gray mt-4">
                      Email and phone are managed through your authentication
                      account.
                    </p>
                  </div>

                  <div className="card p-6">
                    <h3 className="text-heading-md font-medium text-kumfora-charcoal mb-4">
                      Change Password
                    </h3>
                    {settingsSuccess && (
                      <div className="mb-4 p-4 rounded-xl bg-kumfora-sageLight/50 border border-kumfora-sage/20">
                        <p className="text-body-sm text-kumfora-sage">
                          Password updated successfully!
                        </p>
                      </div>
                    )}
                    {settingsError && (
                      <div className="mb-4 p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20">
                        <p className="text-body-sm text-kumfora-rose">
                          {settingsError}
                        </p>
                      </div>
                    )}
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <Input
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                      />
                      <Button type="submit" isLoading={settingsLoading}>
                        Update Password
                      </Button>
                    </form>
                  </div>

                  <div className="card p-6 border-kumfora-rose/30">
                    <h3 className="text-heading-md font-medium text-kumfora-charcoal mb-4">
                      Danger Zone
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-kumfora-cream/50">
                        <div>
                          <p className="font-medium text-kumfora-charcoal">
                            Sign Out
                          </p>
                          <p className="text-body-sm text-kumfora-gray">
                            Sign out of your account on this device.
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          onClick={handleSignOut}
                          leftIcon={<LogOut className="w-4 h-4" />}
                        >
                          Sign Out
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-kumfora-rose/5 border border-kumfora-rose/10">
                        <div>
                          <p className="font-medium text-kumfora-charcoal">
                            Delete Account
                          </p>
                          <p className="text-body-sm text-kumfora-gray">
                            Permanently delete your account and all data.
                          </p>
                        </div>
                        <Button
                          variant="danger"
                          onClick={() => setShowDeleteModal(true)}
                          leftIcon={<Trash2 className="w-4 h-4" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowDeleteModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-kumfora-rose/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-kumfora-rose" />
              </div>
              <h2
                id="delete-modal-title"
                className="text-heading-md font-display font-medium text-kumfora-charcoal"
              >
                Delete Account
              </h2>
            </div>
            <p className="text-body text-kumfora-slate mb-2">
              Are you sure you want to permanently delete your account?
            </p>
            <p className="text-body-sm text-kumfora-gray mb-6">
              This action cannot be undone. All your data, orders, and account
              information will be permanently removed.
            </p>
            {deleteError && (
              <div className="mb-4 p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20">
                <p className="text-body-sm text-kumfora-rose">{deleteError}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteError(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
                isLoading={deleteLoading}
                className="flex-1"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

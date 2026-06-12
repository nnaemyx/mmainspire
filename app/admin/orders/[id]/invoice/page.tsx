"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Send, Printer } from "lucide-react";
import { toPng } from "html-to-image";

type OrderItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

type Payment = {
  amount: number;
  date: string;
  note?: string;
};

type OrderData = {
  _id: string;
  invoiceNumber: string;
  customer: {
    _id: string;
    name: string;
    phone: string;
    email?: string;
  };
  date: string;
  items: OrderItem[];
  total: number;
  advance: number;
  balance: number;
  collectionDate?: string;
  status: string;
  notes?: string;
};

function numberToWords(num: number): string {
  if (num === 0) return "Zero";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convert(n: number): string {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + convert(n % 100) : "");
    if (n < 1000000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    return convert(Math.floor(n / 1000000)) + " Million" + (n % 1000000 ? " " + convert(n % 1000000) : "");
  }

  return convert(Math.floor(num)) + " Naira Only";
}

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    try {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function downloadAsImage() {
    if (!invoiceRef.current) return;
    setGenerating(true);
    try {
      const dataUrl = await toPng(invoiceRef.current, {
        backgroundColor: "#ffffff",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `invoice-${order?.invoiceNumber || "unknown"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to generate image.");
    } finally {
      setGenerating(false);
    }
  }

  function shareOnWhatsApp() {
    if (!order?.customer?.phone) return;
    const phone = order.customer.phone.replace(/^0/, "234").replace(/\D/g, "");
    const message = `Hi ${order.customer.name}, here is your invoice (INV-${order.invoiceNumber}) from Mma Inspire Fashion Allure.\n\nTotal: ₦${order.total.toLocaleString()}\nAdvance Paid: ₦${order.advance.toLocaleString()}\nBalance: ₦${order.balance.toLocaleString()}${order.collectionDate ? `\nCollection Date: ${new Date(order.collectionDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}` : ""}\n\nThank you for choosing Mma Inspire! 🙏`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  }

  function handlePrint() {
    window.print();
  }

  if (loading) return <div className="text-cream font-body">Loading invoice...</div>;
  if (!order) return <div className="text-red-400 font-body">Order not found.</div>;

  // Fill empty rows for the table to match physical invoice
  const tableRows = [...order.items];
  while (tableRows.length < 8) {
    tableRows.push({ description: "", quantity: 0, unitPrice: 0, amount: 0 });
  }

  return (
    <div>
      {/* Controls — hidden on print */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 print:hidden">
        <button
          onClick={() => router.push(`/admin/orders/${order._id}`)}
          className="flex items-center gap-2 text-muted hover:text-cream transition-colors font-body text-sm"
        >
          <ArrowLeft size={16} />
          Back to Order
        </button>
        <div className="flex-1" />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={downloadAsImage}
            disabled={generating}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.25em] uppercase px-4 py-2.5 border border-brand/30 text-brand hover:bg-brand/10 transition-colors disabled:opacity-50"
          >
            <Download size={13} />
            {generating ? "Generating..." : "Download PNG"}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.25em] uppercase px-4 py-2.5 border border-[rgba(255,255,255,0.15)] text-cream hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <Printer size={13} />
            Print
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="flex items-center gap-1.5 font-body text-[9px] tracking-[0.25em] uppercase px-4 py-2.5 bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors"
          >
            <Send size={13} />
            WhatsApp
          </button>
        </div>
      </div>

      {/* ── Invoice Document ── */}
      <div className="flex justify-center">
        <div
          ref={invoiceRef}
          className="w-full max-w-[720px] bg-white text-gray-900 p-10 md:p-12 shadow-2xl relative border-[16px] border-[#113e1f]"
          style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
        >
          {/* Inner Accent Gold Border */}
          <div className="border border-[#c5a059]/30 p-6 md:p-8 h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-[#113e1f] p-2 rounded-full w-16 h-16 shrink-0 border border-[#c5a059]/30 shadow-inner">
                  <img
                    src="https://res.cloudinary.com/mmainspire/image/upload/v1698277749/mmainspire/eralwmthytkztkwamzfs.png"
                    alt="MmaInspire Logo"
                    className="w-12 h-12 object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
                <div>
                  <h1
                    className="text-2xl font-bold tracking-widest uppercase"
                    style={{ fontFamily: "'Bodoni Moda', 'Playfair Display', Georgia, serif", color: "#113e1f" }}
                  >
                    Mma Inspire
                  </h1>
                  <p className="text-[9px] tracking-[0.35em] uppercase text-gray-500 mt-1 font-semibold">
                    Fashion Allure · Trendy Threads
                  </p>
                </div>
              </div>
              <div className="text-right text-[10px] leading-relaxed text-gray-500 max-w-[250px]">
                <p className="font-bold text-[11px] text-[#113e1f] mb-1">
                  Bespoke & Luxury Styling
                </p>
                <p className="italic">
                  Wedding & reception dresses, traditional wears, ready-to-wear, and customized styling
                </p>
                <div className="mt-3 space-y-0.5 text-gray-600">
                  <p className="font-semibold text-gray-700">HEAD OFFICE:</p>
                  <p>72 Upper New Market Road,</p>
                  <p>Onitsha, Anambra State, Nigeria.</p>
                  <p className="mt-1 font-semibold text-[#113e1f]">📞 0806 006 5236</p>
                  <p className="text-gray-500">edehchidimma26@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Invoice Meta details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-6 border-b border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider w-14">
                    CLIENT:
                  </span>
                  <span className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-0.5 min-w-[200px]">
                    {order.customer?.name}
                  </span>
                </div>
                {order.customer?.phone && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider w-14">
                      PHONE:
                    </span>
                    <span className="text-xs text-gray-700 border-b border-gray-200 pb-0.5 min-w-[200px]">
                      {order.customer?.phone}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider w-14">
                    DATE:
                  </span>
                  <span className="text-xs text-gray-700 border-b border-gray-200 pb-0.5 min-w-[200px]">
                    {new Date(order.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end justify-center text-left sm:text-right">
                <div className="inline-block px-4 py-1.5 text-white text-[9px] font-bold tracking-[0.35em] uppercase bg-[#113e1f]">
                  INVOICE RECEIPT
                </div>
                <p className="text-xl font-bold mt-2 tracking-widest text-[#113e1f]">
                  INV-{order.invoiceNumber}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8 border-collapse text-xs">
              <thead>
                <tr className="bg-[#113e1f]/5 text-[#113e1f]">
                  <th className="border border-gray-300 p-2.5 text-center font-bold w-12">
                    NO.
                  </th>
                  <th className="border border-gray-300 p-2.5 text-center font-bold w-14">
                    QTY
                  </th>
                  <th className="border border-gray-300 p-2.5 text-left font-bold tracking-wider">
                    DESCRIPTION OF FABRICS / STYLING
                  </th>
                  <th className="border border-gray-300 p-2.5 text-right font-bold w-28">
                    UNIT PRICE
                  </th>
                  <th className="border border-gray-300 p-2.5 text-right font-bold w-32" colSpan={2}>
                    AMOUNT
                  </th>
                </tr>
                <tr className="bg-[#113e1f]/5 text-[#113e1f]/80">
                  <th className="border border-gray-300 p-0" colSpan={4}></th>
                  <th className="border border-gray-300 p-1 text-center text-[9px] font-bold w-20">
                    NAIRA (₦)
                  </th>
                  <th className="border border-gray-300 p-1 text-center text-[9px] font-bold w-12">
                    KOBO
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((item, i) => {
                  const naira = item.amount ? Math.floor(item.amount) : "";
                  const kobo = item.amount ? "00" : "";
                  return (
                    <tr key={i} className="h-9">
                      <td className="border border-gray-200 p-2.5 text-center text-gray-500">
                        {item.description ? i + 1 : ""}
                      </td>
                      <td className="border border-gray-200 p-2.5 text-center font-semibold text-gray-800">
                        {item.quantity || ""}
                      </td>
                      <td className="border border-gray-200 p-2.5 text-gray-800 font-medium">{item.description}</td>
                      <td className="border border-gray-200 p-2.5 text-right text-gray-700 font-mono">
                        {item.unitPrice ? `₦${item.unitPrice.toLocaleString()}` : ""}
                      </td>
                      <td className="border border-gray-200 p-2.5 text-right font-semibold text-gray-900 font-mono">
                        {naira ? `₦${naira.toLocaleString()}` : ""}
                      </td>
                      <td className="border border-gray-200 p-2.5 text-center text-gray-400 font-mono">{kobo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Totals & Notes */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
              <div className="text-[10px] text-gray-450 leading-relaxed italic max-w-[320px] bg-gray-50 p-4 border-l-4 border-[#c5a059]/40 rounded-r-md">
                <p className="font-bold text-gray-500 not-italic mb-1 uppercase tracking-wider">Note:</p>
                Materials or ready-wears left unclaimed for more than two months are kept at the owner's risk.
              </div>
              <div className="w-full sm:w-[260px] bg-[#113e1f]/5 p-4 rounded-lg border border-[#113e1f]/10 space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Total
                  </span>
                  <span className="font-bold text-base text-gray-900 font-mono">₦{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Advance
                  </span>
                  <span className="font-bold text-base text-[#113e1f] font-mono">₦{order.advance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Balance Due
                  </span>
                  <span className={`font-bold text-base font-mono ${order.balance > 0 ? "text-red-600" : "text-[#113e1f]"}`}>
                    ₦{order.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Amount in Words */}
            <div className="mb-4 text-xs bg-gray-50 px-4 py-3 rounded border border-gray-200">
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mr-2">Amount in words:</span>
              <span className="text-gray-800 font-semibold italic">{numberToWords(order.total)}</span>
            </div>

            {/* Collection Date */}
            {order.collectionDate && (
              <div className="mb-8 text-xs bg-gray-50 px-4 py-3 rounded border border-gray-200 flex items-center gap-2">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Date of Collection:</span>
                <span className="text-gray-800 font-semibold font-mono">
                  {new Date(order.collectionDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            {/* Footer Signatures */}
            <div className="flex justify-between items-end mt-12 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-36 border-b border-gray-400 mb-1.5 font-mono"></div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Customer's Sign</p>
              </div>
              <div className="text-center">
                <p
                  className="text-xs font-bold italic tracking-wide"
                  style={{ color: "#113e1f", fontFamily: "'Bodoni Moda', 'Playfair Display', Georgia, serif" }}
                >
                  For Mma Inspire Fashion Allure
                </p>
                <div className="w-48 border-b border-gray-200 mt-2 mb-1.5 mx-auto"></div>
                <p className="text-[8px] text-gray-400 uppercase tracking-widest">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

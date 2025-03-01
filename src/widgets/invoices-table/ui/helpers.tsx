import { Status, StatusChip, WithImageCell } from "shared/ui";
import stripeIcon from "assets/images/profile/stripe.png";

export interface IFormatInvoice {
  id: string;
  status: JSX.Element;
  date: JSX.Element;
  pricingPlan?: string;
}

export const formatTableData = (invoices: Invoice[]): IFormatInvoice[] => {
  return invoices.map((invoice) => {
    return {
      id: `#${invoice.id.slice(0, 8)}`,
      status: (
        <StatusChip
          status={invoice.status === "PAID" ? Status.Active : Status.Pending}
          label={invoice.status === "PAID" ? "Paid" : "Pending"}
        />
      ),
      date: (
        <p style={{ minWidth: "129px" }}>
          {new Date(invoice.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }) +
            " " +
            new Date(invoice.created_at).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
        </p>
      ),
      pricingPlan: invoice.pricing_plan?.name || undefined,
      amount: `-${invoice.amount / 100}£`,
      paymentMethod: (
        <WithImageCell image={stripeIcon} text={invoice.payment_method.name} />
      ),
      credits: invoice.credits,
    };
  });
};

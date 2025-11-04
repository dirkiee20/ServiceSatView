import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Copy, QrCode as QrCodeIcon, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function IntegrationPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  const feedbackUrl = user?.feedbackLinkId
    ? `${window.location.origin}/f/${user.feedbackLinkId}`
    : "";

  useEffect(() => {
    if (feedbackUrl && qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, feedbackUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
    }
  }, [feedbackUrl]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const downloadQRCode = () => {
    if (qrCanvasRef.current) {
      const url = qrCanvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "feedback-qr-code.png";
      link.href = url;
      link.click();
      toast({
        title: "Downloaded",
        description: "QR code saved to your downloads",
      });
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Integration</h1>
        <p className="text-muted-foreground">
          Share your unique feedback link with customers or embed it in your system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Link Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Feedback Link</CardTitle>
            <CardDescription>
              Share this link with customers to collect feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={feedbackUrl}
                readOnly
                data-testid="input-feedback-url"
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(feedbackUrl, "Link")}
                data-testid="button-copy-url"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(feedbackUrl, "_blank")}
                data-testid="button-open-url"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Integration Examples</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Email Signature
                  </p>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-xs break-all">
                      Rate your experience: {feedbackUrl}
                    </code>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    HTML Embed
                  </p>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-xs break-all">
                      {`<a href="${feedbackUrl}" target="_blank">Share Feedback</a>`}
                    </code>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    After Purchase Message
                  </p>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-xs break-all">
                      Thank you for your purchase! Help us improve: {feedbackUrl}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCodeIcon className="h-5 w-5" />
              QR Code
            </CardTitle>
            <CardDescription>
              Use this QR code for physical locations or printed materials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <canvas ref={qrCanvasRef} className="border rounded-lg" />
            </div>

            <Button
              className="w-full"
              variant="outline"
              onClick={downloadQRCode}
              data-testid="button-download-qr"
            >
              Download QR Code
            </Button>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Use Cases</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Print on receipts or invoices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Display at checkout counters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Include in packaging materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Add to business cards or flyers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Post in physical store locations</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>
                <strong>Make it easy to find:</strong> Place your feedback link in prominent
                locations where customers naturally look after interacting with your service
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>
                <strong>Ask at the right time:</strong> Request feedback shortly after the
                service experience when it's still fresh in customers' minds
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>
                <strong>Keep it simple:</strong> Let customers know it only takes a minute
                to complete
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">4.</span>
              <span>
                <strong>Show you care:</strong> Respond to feedback and make improvements
                based on what you learn
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

import { Shield, Users, FileCheck, Lock } from "lucide-react";

export const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description:
      "Patient records are cryptographically secured and verified on the Sui blockchain for immutable proof of authenticity.",
  },
  {
    icon: Users,
    title: "Multi-User Access",
    description:
      "Hospitals manage patient data while patients have secure access to view their own medical history.",
  },
  {
    icon: FileCheck,
    title: "Instant Verification",
    description:
      "Third parties can instantly verify the authenticity of medical records using blockchain hashes.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "All patient data is encrypted at rest. Only hashes are stored on-chain for verification purposes.",
  },
];

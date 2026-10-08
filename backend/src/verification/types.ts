import type {
  SpideyFinding,
  SpideyVerification,
} from "../ai/types";

export type VerificationInput = {
  findings: SpideyFinding[];
  code: string;
};

export type VerificationResult =
  SpideyVerification;
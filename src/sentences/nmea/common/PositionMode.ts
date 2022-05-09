export enum BroadPositionMode {
  NoFix = "N",
  DeadReckoning = "E",
  DifferentialFix = "D",
  AutonomousFix = "A",
}

export enum PrecisePositionMode {
  NoFix = "N",
  DeadReckoning = "E",
  FloatRTK = "F",
  FixedRTK = "R",
  DifferentialFix = "D",
  AutonomousFix = "A",

  // these are unconfirmed:
  Manual = "M",
  Precise = "P",
  Simulator = "S",
}

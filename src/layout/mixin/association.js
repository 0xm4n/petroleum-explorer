
export default {
  methods: {
    association() {
      this.associationData = [{
        Rule: 'Rule1',
        Expression: 'IF high average injection hour with low standard deviation low average injection steam with low standard deviation THEN good sor average with low sor standard deviation',
        Condifence: '90% (18/20 pairs)'
      },
      {
        Rule: 'Rule2',
        Expression: 'IF low average injection hour with high standard deviation THEN low average oil production with low standard deviation',
        Condifence: '86% (18/21 pairs)'
      },
      {
        Rule: 'Rule3',
        Expression: 'IF low average injection steam with low standard deviation  THEN low average oil production with low standard deviation',
        Condifence: '85% (47/55 pairs)'
      },
      {
        Rule: 'Rule4',
        Expression: 'IF medium average injection hour with medium standard deviation high average injection steam with medium standard deviation THEN low average oil production with low standard deviation',
        Condifence: '83% (19/23 pairs)'
      },
      {
        Rule: 'Rule5',
        Expression: 'IF low average and low standard deviation injection steam THEN good sor average with low sor standard deviation',
        Condifence: '80% (24/30 pairs)'
      }]
    }
  }
}

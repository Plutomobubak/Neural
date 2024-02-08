Hebbian learning
\[ w_{ij} = \frac{1}{n} \sum_{\mu=1}^{n} \epsilon_{i}^{\mu} \epsilon_{j}^{\mu} \]
Storkey learning
\[ \Delta w_{ij} = \eta (\epsilon_{i} \epsilon_{j} - \epsilon_{i} w_{ij} \sum_{k \neq i,j} w_{ik} \epsilon_{k} - w_{ij} \sum_{k \neq i,j} w_{jk} \epsilon_{k}) \]

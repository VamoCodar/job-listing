const vm = new Vue({
    el: "#app",
    data: {
        jobs: {},
        tags: [],
        tagsAtivas: [],
        filterAtivo: false,
        itemTags: []
    },

    watch: {
        tagsAtivas() { this.filtrar() }
    },
    methods: {

        puxarJobs() {
            fetch("./data.json")
                .then(r => r.json())
                .then(r => {
                    this.jobs = r
                    this.tagsAtivas.length ? this.filtrar() : ""


                })

        },

        filtrar() {
            this.jobs = this.jobs.filter((job) => {
                let tamanhoFiltros = this.tagsAtivas.length
                const inclueRole = this.tagsAtivas.includes(job.role)
                const inclueLevel = this.tagsAtivas.includes(job.level)
                const inclueTools = job.tools.filter(i => this.tagsAtivas.includes(i)).length ? true : false
                const inclueLanguages = job.languages.filter(i => this.tagsAtivas.includes(i)).length ? true : false
                const valores = [inclueRole, inclueLevel, inclueTools, inclueLanguages]
                const valoresPositivos = valores.filter(i => i).length
                const valoresNegativos = valores.filter(i => !i).length


                if (tamanhoFiltros === 1) {
                    if (valoresPositivos)
                        return true
                    else
                        return false
                }
                if (tamanhoFiltros === 2) {
                    if (valoresPositivos >= 2)
                        return true
                    else if (valoresPositivos >= 1)
                        return false
                    else
                        return false
                }
                if (tamanhoFiltros >= 3) {
                    if (valoresPositivos >= 3)
                        return true
                    else if (valoresPositivos <= 2)
                        return false
                    else
                        return false
                }




            })

            this.jobs = this.jobs.sort((job) => {
                let tamanhoFiltros = this.tagsAtivas.length
                const inclueRole = this.tagsAtivas.includes(job.role)
                const inclueLevel = this.tagsAtivas.includes(job.level)
                const inclueTools = job.tools.filter(i => this.tagsAtivas.includes(i)).length ? true : false
                const inclueLanguages = job.languages.filter(i => this.tagsAtivas.includes(i)).length ? true : false
                const valores = [inclueRole, inclueLevel, inclueTools, inclueLanguages]
                const valoresPositivos = valores.filter(i => i).length
                const valoresNegativos = valores.filter(i => !i).length

                return -(valoresPositivos)
            })

        },


        removeTag(index) {
            this.tagsAtivas.splice(index, 1)
            this.puxarJobs()


        },

        addTag(item) {
            this.filterAtivo = true
            if (!this.tagsAtivas.includes(item)) {
                this.tagsAtivas.push(item)

            }

        },


        clearAll() {
            this.tagsAtivas = []
            this.puxarJobs()

        },



    },



    created() {
        this.puxarJobs()
    },
    updated() {

    }



})
# 基于Makefile脚本构建和部署项目到kubernetes集群
APPLICATION = demo
VERSION = v1.0.0

# 默认开发环境配置
CONTEXT = dev
REGISTRY = dev.xxx.com
PROJECT = devProjectName

# 正式环境配置
CONTEXT_PROD = prod
REGISTRY_PROD = prod.xxx.com
PROJECT_PROD = prodProjectName


ifeq (${CONTEXT_PROD},$(shell kubectl config current-context))
	REGISTRY = ${REGISTRY_PROD}
	PROJECT = ${PROJECT_PROD}
endif

.PHONY: help ctx ccdev ccprod build docker kube all

# 帮助信息
help: ctx
	$(_help)

# 当前执行环境信息
ctx:
	@echo current context `kubectl config current-context`

# 切换上下文执行环境到本地
ccdev:
	@kubectl config use-context ${CONTEXT}

# 切换上下文执行环境到正式
ccprod:
	@kubectl config use-context ${CONTEXT_PROD}

# 编译任务
build: ctx
	@gulp build
	@GOOS=linux GOARCH=amd64 go build -o ./${APPLICATION}

# 镜像地址:registry/project/application
# 镜像构建/上传
docker: ctx
	@docker build -t ${REGISTRY}/${PROJECT}/${APPLICATION}:${VERSION} .
	@docker push ${REGISTRY}/${PROJECT}/${APPLICATION}:${VERSION}

# 应用部署到k8s
kube: ctx
	@kubectl delete -f k8s/$(shell kubectl config current-context)/
	@kubectl create -f k8s/$(shell kubectl config current-context)/

# 全部任务
all: ctx build docker kube

define _help
	@echo
	@echo "--------------------------help----------------------------------"
	@echo
	@echo "ctx        show current context"
	@echo
	@echo "ccdev      change context to dev"
	@echo
	@echo "ccprod     change context to prod"
	@echo
	@echo "build      gulp build + go build"
	@echo
	@echo "docker     docker build + docker push"
	@echo
	@echo "kube       kubernetes task,update pods/svc/deployment etc."
	@echo
	@echo "all        build + docker + kube sequence-task "
	@echo
	@echo "-----------------------------------------------------------------"
	@echo
endef
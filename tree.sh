#!/bin/bash

#redir()是一个遍历目录的函数，tab用来计算目录名的步进长度，
#真正进行的绘图的变量是line

redir ()
{
	tab=$tab$singletab
	line=${tab%"$singletab"}"|-------"
	
	#观察目录树结构，可发现处于底部的目录需做特殊处理
	#以参数数目作为循环条件
	count=$#

	for file in "$@"; do
		#将当前目录下的文件加入路径，为判断做准备
		thisfile=${thisfile:-$PWD}/$file
	
		#判断是当前文件否为目录
		if [ -d "$thisfile" ]; then
			
			#如果是排在列表最后的目录，则去掉其前一个TAB的|
			if [ $count -eq 1 ]; then
				echo -e $line$file
				tab=${tab%"$singletab"}"\t"
				line=${tab%"\t"}"|-------"
				redir $(ls $thisfile)
			else

				#如果是普通目录，需在目录名后加/
				echo -e $line$file/
				redir $(ls $thisfile)
			fi
			
		else
			#如果是普通文件则只输出文件名
			echo -e $line$file
		fi
		
		#为退回上层目录做准备
		thisfile=${thisfile%/*}
		let count=count-1	
	done
	
	#从下层目录循环出来，前移一个TAB
	tab=${tab%"$singletab"}
	line=${tab%"$singletab"}"|-------"
}

#####################################

singletab="|\t"
userinput="$@"

# 默认为显示当前目录结构
for file in ${userinput:-.}; do
	echo $file
	echo '|'
	if [ -d "$file" ]; then
		cd $file
		redir $(ls)
		cd ..
	fi
done
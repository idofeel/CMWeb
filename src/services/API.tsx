export default {
    main: {
        // 主菜单（不包含为空的资源）
        menu: '/?r=common&d=menu',
    },
    source: {
        // 公开资源列表
        public: '/?r=cle&d=list&o=public',  // {ids[],st}
        // 私有资源列表
        private: '/?r=cle&d=list&o=private', // {ids[],st}
        // 搜索
        search: '/?r=cle&d=name',  // {name}
        base: '/?r=cle&d=base', // {pid}
        delete: '/?r=cle&d=delprivate' // {pid}
    },
    fileInfo: {
        // les 文件信息
        les: '/?r=cle&d=les', // {pid}
        // cle 文件信息
        cle: '/?r=cle&d=file' // {pid,devid}
    },
    auth: {
        // 注册
        register: '/?r=user&d=register&o=submit', // {username,password,password2,email,register_mode,seccode,authority_code,orgid}
        login: '/?r=user&d=login&m=name',
        isUname: '/?r=user&d=register&o=isusername',
        imgcode: '/?r=user&d=register&o=getseccode',
        isseccode: '/?r=user&d=register&o=isseccode',
        islogin: '/?r=user&d=islogin',
        qqLogin: '/?r=user&d=qcloginstep1',
        qqLogin2: '/?r=user&d=login&m=qq',
        logout: '/?r=user&d=logout',
    },
    profile: {
        getAvatar: '/?r=center&d=getavatar',
        setPassword: '/?r=center&d=setpassword',
        getAll: '/?r=center&d=exprofile&o=getall',
        setone: '/?r=center&d=exprofile&o=setone',
        getBase: '/?r=center&d=profile&o=getbase',
        getExt: '/?r=center&d=extprofile&o=getext', // 扩展信息
    },
    publish: {
        // 主分类 （所有的分类信息）
        category: '/?r=common&d=category&id=1',
        // 资源分类信息
        hasCategory: '/?r=cle&d=category', // {pid}
        insertCate: '/admin.php?r=cle&d=setcate&o=insert', // {pid,cateid}
        deleteCate: '/admin.php?r=cle&d=setcate&o=delete', //  {pid,cateid}
        addCate: '/admin.php?r=category&d=set&o=add', //  {catename,parentid}
        transCate: '/admin.php?r=category&d=set&o=graft', // {cateid, destid} // {迁移的分类id,迁移到其下的分类id}
        refushCate: '/admin.php?r=category&d=set&o=countson'
    },
    serverinfo: '/?r=common&d=serverinfo',
    upload: {
        undone: '/?r=cle&d=importprivate&o=getting',
        start: '/?r=cle&d=importprivate&o=setone', // {pid,name}
        cleFile: '/?r=cle&d=importprivate&o=setfileinfo', //{infoid}
        cleChunk: '/?r=cle&d=importprivate&o=uploadchunk',
        cover: '/?r=cle&d=importprivate&o=cover',
        changeName: '/?r=cle&d=importprivate&o=resetname', //{infoid,name}
        import: '/?r=cle&d=importprivate&o=import',
        cancel: '/?r=cle&d=importprivate&o=cancel',
        getInfo: '/?r=cle&d=importprivate&o=getinfo', //{infoid}
    },
    modify: {
        UpAvatar: '/?r=center&d=upavatar', // {file}
        nikeName: '/?r=center&d=profile&o=setnick', // {nick}
        realName: '/?r=center&d=profile&o=setrealname', // {realname}
        extprofile: '/?r=center&d=extprofile&o=setone', // {cid,v}
    }

}